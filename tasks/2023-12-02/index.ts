export class ChristmasQueue<Gift> {
  queue: { item: Gift; priority: number }[];

  constructor() {
    this.queue = [];
  }

  #setQueue(queue: { item: Gift; priority: number }[]) {
    this.queue = queue;
  }

  enqueue(item: Gift, priority: number): void {
    const itemsWithHigherPriority = this.queue.filter(
      (queueItem) => queueItem.priority > priority
    );
    const itemsWithSamePriority = this.queue.filter(
      (queueItem) => queueItem.priority === priority
    );
    const itemsWithLowerPriority = this.queue.filter(
      (queueItem) => queueItem.priority < priority
    );

    this.#setQueue([
      ...itemsWithHigherPriority,
      ...itemsWithSamePriority,
      { item, priority },
      ...itemsWithLowerPriority,
    ]);
  }

  dequeue(): Gift {
    const removedItem = this.queue.shift();
    if (!removedItem) {
      throw new Error('There are no letters in the queue!');
    }
    return removedItem.item;
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }
}
