import { createMachine, assign } from '@xstate/fsm';
import { Article } from '../shared/src/client';

type MachineState =
  | { value: 'all'; context: MachineContext }
  | { value: 'tagSelected'; context: MachineContext };

type MachineContext = { 
  selectedTag?: string;
  articles?: Article[];
  subsections: {
    [key: string]: Article[] | undefined
  }
};

type MachineEvent = 
  | { type: 'SELECT_TAG'; tag: string; }
  | { type: 'UNSELECT_TAG' }
  | { type: 'LOAD_CONTENT' }
  | { type: 'CONTENT_LOADED' }
  | { type: 'HYDRATE', subsection?: string, articles: Article[] };

const newsSectionStates = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        LOAD_CONTENT: 'loading',
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
  initial: 'all',
  context: {
    subsections: {}
  },
  states: {
    all: {
      on: {
        SELECT_TAG: {
          target: 'tagSelected',
          actions: ['setTag']
        },
        HYDRATE: {
          target: 'all',
          actions: ['hydrateSection']
        }
      },
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
        },
        HYDRATE: {
          target: 'all',
          actions: ['hydrateSection']
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
    hydrateSection: assign<MachineContext, MachineEvent>((ctx, evt) => {
      if (evt.type !== 'HYDRATE') {
        return {};
      }

      const { articles, subsection } = evt;
      const updatedContext: Partial<MachineContext> = {};

      if (articles !== undefined) {
        if (typeof subsection === 'string') {
          updatedContext.subsections = {
            ...ctx.subsections,
            [subsection]: articles
          }
        }

        else {
          updatedContext.articles = articles;
        }
      }
      
      return {
        ...ctx,
        ...updatedContext
      };
    })
  }
});