type EventListener = (...args: unknown[]) => void;

class EventEmitter {
  private listeners: Map<string, EventListener[]>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: EventListener): void {
    const eventListeners = this.listeners.get(event) || [];
    eventListeners.push(listener);
    this.listeners.set(event, eventListeners);
  }

  emit(event: string, ...args: unknown[]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((listener) => {
        listener(...args);
      });
    }
  }

  off(event: string, listener: EventListener): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const filteredListeners = eventListeners.filter((l) => l !== listener);
      if (filteredListeners.length === 0) {
        this.listeners.delete(event);
      } else {
        this.listeners.set(event, filteredListeners);
      }
    }
  }
}

export class ChristmasEmitter {
  #eventEmitter = new EventEmitter();
  on(type: 'letter' | 'gift', callback: () => unknown) {
    this.#eventEmitter.on(type, callback);
  }
  off(type: 'letter' | 'gift', callback: () => unknown) {
    this.#eventEmitter.off(type, callback);
  }
  emit(type: 'letter' | 'gift') {
    this.#eventEmitter.emit(type);
  }
}
