export class GiftRegistry {
  private registry: Map<number, string[]>;

  constructor() {
    this.registry = new Map();
  }

  addGift(childId: number, newGift: string) {
    const oldGiftList = this.registry.get(childId) ?? [];
    const newGiftList = [...oldGiftList, newGift];
    this.registry.set(childId, newGiftList);
  }

  getGiftsForChild(childId: number) {
    const childGiftList = this.registry.get(childId);
    if (!childGiftList) throw new Error('Child not found');
    return childGiftList;
  }

  removeGift(childId: number, giftToRemove: string) {
    const childGiftList = this.getGiftsForChild(childId);
    if (!childGiftList.includes(giftToRemove)) {
      throw new Error('Gift not found');
    }
    const newGiftList = childGiftList.filter((gift) => gift !== giftToRemove);
    this.registry.set(childId, newGiftList);
  }
}
