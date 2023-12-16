type GalacticHistoryTracer<T> = { type: 'ADD' | 'UNDO' | 'REDO'; payload?: T };

export function createTracer<T>() {
  let state: T[] = [];
  let current = -1;
  let events: GalacticHistoryTracer<T>[] = [];

  let eventHandlers: {
    [key: string]: (action: GalacticHistoryTracer<T>) => void;
  } = {
    ADD: ({ payload }) => {
      if (!payload) {
        throw new Error('No payload provided');
      }
      state = state.slice(0, current + 1);
      state.push(payload);
      current++;
    },
    UNDO: () => {
      if (current >= 0) {
        current--;
      }
    },
    REDO: () => {
      if (current < state.length - 1) {
        current++;
      } else {
        throw new Error('No more galaxies to explore');
      }
    },
  };

  return {
    add(item: T): void {
      let action = { type: 'ADD', payload: item } as const;
      events.push(action);
      eventHandlers[action.type](action);
    },
    current(): T | null {
      return current >= 0 ? state[current] : null;
    },
    undo(): void {
      let action = { type: 'UNDO' } as const;
      events.push(action);
      eventHandlers[action.type](action);
    },
    redo(): void {
      let action = { type: 'REDO' } as const;
      events.push(action);
      eventHandlers[action.type](action);
    },
  };
}
