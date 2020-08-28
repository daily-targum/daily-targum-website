import { createMachine, assign } from 'xstate';
import { CompactArticle } from '../shared/src/client';

type MachineState =
  | { value: 'dehydrated'; context: MachineContext }
  | { value: 'all'; context: MachineContext }
  | { value: 'tagSelected'; context: MachineContext };

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

export const sportsMachine = createMachine<MachineContext, MachineEvent, MachineState>({
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