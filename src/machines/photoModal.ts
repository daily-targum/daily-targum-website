import { assign, createMachine } from '@xstate/fsm';

type MachineState =
  | { value: 'grid'; context: MachineContext }
  | { value: 'modal'; context: MachineContext };

type MachineContext = { 
  itemId: string;
  initialIndex: number;
};

type MachineEvent = 
  | { type: 'OPEN_ITEM'; itemId: string; initialIndex: number }
  | { type: 'CLOSE_ITEM' };

export const photoModalMachine = createMachine<MachineContext, MachineEvent, MachineState>({
  id: 'horu',
  initial: 'grid',
  context: {
    itemId: '',
    initialIndex: 0
  },
  states: {
    grid: {
      on: {
        OPEN_ITEM: {
          target: 'modal',
          actions: ['setItem']
        }
      }
    },
    modal: {
      on: {
        CLOSE_ITEM: {
          target: 'grid',
          actions: ['resetInitialIndex']
        }
      }
    }
  }
}, {
  actions: {
    setItem: assign<MachineContext, MachineEvent>((_, evt) => {
      if (evt.type !== 'OPEN_ITEM') {
        return {};
      }

      const { itemId, initialIndex } = evt;
      const updatedContext: Partial<MachineContext> = {};

      if (itemId !== undefined) {
        updatedContext.itemId = itemId;
        updatedContext.initialIndex = initialIndex ?? 0;
      }

      return updatedContext;
    }),
    resetInitialIndex: assign<MachineContext, MachineEvent>((ctx) => {
      return {
        ...ctx,
        initialIndex: 0,
      };
    })
  },
});