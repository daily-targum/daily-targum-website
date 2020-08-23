import { createMachine, assign } from '@xstate/fsm';
import { Article } from '../shared/src/client';

type MachineState =
  | { value: 'dehydrated'; context: MachineContext }
  | { value: 'idle'; context: MachineContext }
  | { value: 'loading'; context: MachineContext };

type MachineContext = { 
  articles?: Article[];
};

type MachineEvent = 
  | { type: 'LOAD_MORE_CONTENT' }
  | { type: 'CONTENT_LOADED' }
  | { type: 'HYDRATE', articles: Article[] };

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
          target: 'idle'
        }
      }
    }
  }
}, {
  actions: {
    hydrate: assign<MachineContext, MachineEvent>((ctx, evt) => {
      if (evt.type !== 'HYDRATE') {
        return {};
      }

      const { articles } = evt;
      const updatedContext: Partial<MachineContext> = {};

      updatedContext.articles = articles;
      
      return {
        ...ctx,
        ...updatedContext
      };
    })
  }
});