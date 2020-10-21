import * as React from 'react';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import { CompactArticle } from '../shared/src/client';

// type MachineState =
//   | { value: 'dehydrated'; context: MachineContext }
//   | { value: 'all'; context: MachineContext }
//   | { value: 'tagSelected'; context: MachineContext };

type MachineContext = { 
  selectedTag?: string;
  articles?: CompactArticle[];
  subcategories: {
    [key: string]: CompactArticle[] | undefined
  }
};

type MachineEvent = 
  | { type: 'SELECT_TAG'; tag: string; }
  | { type: 'UNSELECT_TAG' }
  | { type: 'LOAD_MORE_CONTENT' }
  | { type: 'CONTENT_LOADED'; articles: CompactArticle[] }
  | { type: 'HYDRATE', subcategories: string[], articles: CompactArticle[] }
  | { type: 'OUT_OF_CONTENT' };

const newsSectionStates = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        LOAD_MORE_CONTENT: {
          target: 'loading'
        },
      }
    },
    loading: {
      on: {
        CONTENT_LOADED: {
          target: 'idle',
          actions: ['registerMoreArticles']
        },
        OUT_OF_CONTENT: {
          target: 'outOfContent'
        }
      }
    },
    outOfContent: {}
  }
};

export const sportsMachine = createMachine<MachineContext, MachineEvent>({
  id: 'sports',
  initial: 'dehydrated',
  context: {
    subcategories: {}
  },
  states: {
    dehydrated: {
      on: {
        HYDRATE: {
          target: 'all',
          actions: ['hydrate']
        }
      }
    },
    all: {
      on: {
        SELECT_TAG: {
          target: 'tagSelected',
          actions: ['setTag']
        },
      },
      ...newsSectionStates
    },
    tagSelected: {
      on: {
        UNSELECT_TAG: {
          target: 'all',
          actions: ['unsetTag']
        },
        SELECT_TAG: {
          target: 'tagSelected',
          actions: ['setTag']
        }
      },
      ...newsSectionStates
    }
  }
}, {
  actions: {
    setTag: assign<MachineContext, MachineEvent>((ctx, evt) => {
      if (evt.type !== 'SELECT_TAG') {
        return {};
      }

      const { tag } = evt;
      const updatedContext: Partial<MachineContext> = {};

      if (tag !== undefined) {
        updatedContext.selectedTag = tag;  
      }
      
      return {
        ...ctx,
        ...updatedContext
      };
    }),
    unsetTag: assign<MachineContext, MachineEvent>({
      selectedTag: () => undefined
    }),
    hydrate: assign<MachineContext, MachineEvent>((ctx, evt) => {
      if (evt.type !== 'HYDRATE') {
        return {};
      }

      const { articles, subcategories } = evt;
      const updatedContext: Partial<MachineContext> = {};

      updatedContext.articles = articles;
      updatedContext.subcategories = {};

      subcategories.forEach(subcategory => {
        if (typeof updatedContext.subcategories === 'object') {
          updatedContext.subcategories[subcategory] = articles.filter(a => a.subcategory === subcategory);
        }
      });
      
      return {
        ...ctx,
        ...updatedContext
      };
    }),
    registerMoreArticles: assign<MachineContext, MachineEvent>((ctx, evt) => {
      if (evt.type !== 'CONTENT_LOADED') {
        return {};
      }

      const { articles } = evt;
      const { selectedTag } = ctx;
      const updatedContext: Partial<MachineContext> = {};

      if (typeof selectedTag === 'string') {
        updatedContext.subcategories = {
          ...ctx.subcategories,
          [selectedTag]: [
            ...(ctx.subcategories?.[selectedTag] ?? []),
            ...articles
          ]
        };
      }

      else {
        updatedContext.articles = [
          ...(ctx.articles ?? []),
          ...articles
        ]
      }
      
      return {
        ...ctx,
        ...updatedContext
      };
    })
  }
});

type UseSports= {
  initialArticles: CompactArticle[];
  subcategories: string[];
}

export function useSports({
  initialArticles,
  subcategories
}: UseSports) {
  const [state, send] = useMachine(sportsMachine);
  const selectedTag = state.context.selectedTag;

  React.useEffect(() => {
    if (initialArticles) {
      send({
        type: 'HYDRATE',
        articles: initialArticles,
        subcategories
      });
    }
  }, [send]);

  // request more content for pagination
  React.useEffect(() => {
    const parentState = typeof state.value === "object" ? Object.keys(state.value)[0] : state.value;
    const cancledRef = { cancled: false };

    if (parentState === 'all' || parentState === 'tagSelected') {

      async function load() {
        const { actions } = await import('../shared/src/client');

        if (selectedTag) {
          const lastArticle = state.context.subcategories?.[selectedTag]?.slice(-1)[0];
  
          actions.getArticlesBySubcategory({
            subcategory: selectedTag,
            lastEvaluatedKey: lastArticle?.id,
            lastPublishDate: lastArticle?.publishDate
          })
          .then(newArticles => {
            if (!cancledRef.cancled) {
              if (newArticles && newArticles.length > 0) {
                send({
                  type: 'CONTENT_LOADED',
                  articles: newArticles
                });
              }
      
              else {
                send({
                  type: 'OUT_OF_CONTENT'
                });
              }
            }
          });
        }
  
        else {
          const lastArticle = state.context.articles?.slice(-1)[0];
          if (!lastArticle) return;
  
          actions.getArticles({
            category: 'Sports',
            lastEvaluatedKey: lastArticle.id,
            lastPublishDate: lastArticle.publishDate
          })
          .then(res => {
            if (!cancledRef.cancled) {
              const newArticles = res.items?.[0]?.articles ?? [];
      
              if (newArticles && newArticles.length > 0) {
                send({
                  type: 'CONTENT_LOADED',
                  articles: newArticles
                });
              }
      
              else {
                send({
                  type: 'OUT_OF_CONTENT'
                });
              }
            }
          });
        }
      }

      load();
    }

    return () => {
      cancledRef.cancled = true;
    }
  }, [state.value, send, selectedTag, state.context]);

  const loadMore = React.useCallback(
    () => send({
      type: 'LOAD_MORE_CONTENT'
    }),
    [send]
  );

  const outOfContent = ['all.outOfContent', 'tagSelected.outOfContent'].some(
    state.matches
  );

  let selectedArticles: (CompactArticle | undefined)[];
  if (typeof selectedTag === 'string') {
    selectedArticles = state.context.subcategories?.[selectedTag] ?? [];
  } else {
    selectedArticles = state.context.articles ?? initialArticles;
  }

  return {
    selectedArticles,
    loadMore,
    outOfContent,
    selectedTag: state.context.selectedTag ?? null,
    setSelectedTag: (val: string | null) => {
      if (val !== null) {
        send({
          type: 'SELECT_TAG',
          tag: val
        });
      }

      else {
        send({
          type: 'UNSELECT_TAG',
        });
      }
    }
  }
}