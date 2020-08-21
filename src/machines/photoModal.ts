import { assign, createMachine } from '@xstate/fsm';

type MachineState =
  | { value: 'grid'; context: MachineContext }
  | { value: 'modal'; context: MachineContext };

type MachineContext = { 
  itemId: string;
};

type MachineEvent = 
  | { type: 'OPEN_ITEM'; itemId: string }
  | { type: 'CLOSE_ITEM' };

export const photoModalMachine = createMachine<MachineContext, MachineEvent, MachineState>({
  id: 'horu',
  initial: 'grid',
  context: {
    itemId: ''
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
        CLOSE_ITEM: 'grid'
      }
    }
  }
}, {
  actions: {
    setItem: assign<MachineContext, MachineEvent>((_, evt) => {
      if (evt.type !== 'OPEN_ITEM') {
        return {};
      }

      const { itemId } = evt;
      const updatedContext: Partial<MachineContext> = {};

      if (itemId !== undefined) {
        updatedContext.itemId = itemId;
      }

      return updatedContext;
    })
  },
});