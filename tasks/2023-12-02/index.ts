export class ChristmasQueue<Gift> {
  queue: { item: Gift; priority: number; order: number }[];
  orderCounter: number;

  constructor() {
    this.queue = [];
    this.orderCounter = 0;
  }

  enqueue(item: Gift, priority: number): void {
    this.queue.push({ item, priority, order: this.orderCounter++ });
    this.queue.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.order - b.order;
      }
      return b.priority - a.priority;
    });
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
