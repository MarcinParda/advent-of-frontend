import EventEmitter from 'node:events';

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
