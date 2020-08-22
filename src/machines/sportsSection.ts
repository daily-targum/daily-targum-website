import { createMachine, assign } from '@xstate/fsm';
import { Article } from '../shared/src/client';

type MachineState =
  | { value: 'dehydrated'; context: MachineContext }
  | { value: 'all'; context: MachineContext }
  | { value: 'tagSelected'; context: MachineContext };

type MachineContext = { 
  selectedTag?: string;
  articles?: Article[];
  subcategories: {
    [key: string]: Article[] | undefined
  }
};

type MachineEvent = 
  | { type: 'SELECT_TAG'; tag: string; }
  | { type: 'UNSELECT_TAG' }
  | { type: 'LOAD_MORE_CONTENT' }
  | { type: 'CONTENT_LOADED' }
  | { type: 'HYDRATE', subcategories: string[], articles: Article[] };

const newsSectionStates = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        LOAD_MORE_CONTENT: 'loading',
      }
    },
    loading: {
      on: {
        CONTENT_LOADED: 'idle'
      }
    }
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
        }
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
    })
  }
});