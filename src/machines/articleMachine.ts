import React from 'react';
import { createMachine, assign } from '@xstate/fsm';
import { actions, GetArticles, GetArticlesBySubcategory, CompactArticle } from '../shared/src/client';
import { useMachine } from '@xstate/react/lib/fsm';

type MachineState =
  | { value: 'dehydrated'; context: MachineContext }
  | { value: 'idle'; context: MachineContext }
  | { value: 'loading'; context: MachineContext }
  | { value: 'outOfContent'; context: MachineContext };

type MachineContext = { 
  articles?: CompactArticle[];
};

type MachineEvent = 
  | { type: 'LOAD_MORE_CONTENT' }
  | { type: 'HYDRATE', articles: CompactArticle[] }
  | { type: 'CONTENT_LOADED', articles: CompactArticle[] }
  | { type: 'OUT_OF_CONTENT' };

export const articleMachine = createMachine<MachineContext, MachineEvent, MachineState>({
  id: 'article',
  initial: 'dehydrated',
  context: {},
  states: {
    dehydrated: {
      on: {
        HYDRATE: {
          target: 'idle',
          actions: ['hydrate']
        }
      }
    },
    idle: {
      on: {
        LOAD_MORE_CONTENT: {
          target: 'loading'
        }
      }
    },
    loading: {
      on: {
        CONTENT_LOADED: {
          target: 'idle',
          actions: ['hydrate']
        },
        OUT_OF_CONTENT: {
          target: 'outOfContent'
        }
      }
    },
    outOfContent: {}
  }
}, {
  actions: {
    hydrate: assign<MachineContext, MachineEvent>((ctx, evt) => {
      if (evt.type !== 'HYDRATE' && evt.type !== 'CONTENT_LOADED') {
        return {};
      }

      const { articles } = evt;
      const updatedContext: Partial<MachineContext> = {};

      updatedContext.articles = [
        ...(ctx.articles ?? []),
        ...articles
      ];
      
      return {
        ...ctx,
        ...updatedContext
      };
    })
  }
});

type UseArticle = {
  initialArticles: GetArticles
  category: string
  subcategory?: string
} | {
  initialArticles: null | GetArticlesBySubcategory
  category?: string
  subcategory?: string
}

export function useArticles({
  initialArticles,
  category,
  subcategory
}: UseArticle): {
  articles: CompactArticle[]
  loadMore: () => any
} {
  const [state, send] = useMachine(articleMachine);

  let articles = state.context.articles ?? (
    // @ts-ignore
    category ? initialArticles.items[0].articles : initialArticles
  );
  const lastArticle = articles?.slice(-1)[0];

  React.useEffect(() => {
    if (articles) {
      send({
        type: 'HYDRATE',
        articles
      });
    }
  }, [articles, send]);

  // request more content for pagination
  React.useEffect(() => {
    if (state.value === 'loading' && lastArticle) {

      if (category) {
        actions.getArticles({
          category,
          lastEvaluatedKey: lastArticle.id,
          lastPublishDate: lastArticle.publishDate
        })
        .then(res => {
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
        });  
      }

      else if (subcategory) {
        actions.getArticlesBySubcategory({
          subcategory,
          lastEvaluatedKey: lastArticle?.id,
          lastPublishDate: lastArticle?.publishDate
        })
        .then(newArticles => {
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
        });
      }

      
    }
  }, [state.value, lastArticle, send]);

  const loadMore = React.useCallback(
    () => send({
      type: 'LOAD_MORE_CONTENT'
    }),
    [send]
  );

  return {
    loadMore,
    articles
  };
}