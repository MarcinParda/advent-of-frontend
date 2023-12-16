type ItemType = 'hat' | 'smartphone' | 'book' | 'console';

const ITEM_SIZE: Record<ItemType, number> = {
  console: 1,
  hat: 3,
  book: 4,
  smartphone: 10,
};

export function* storageQuery(
  totalStorage: number,
  itemType: ItemType,
  storageResolver: (itemType: ItemType) => boolean
) {
  if (!storageResolver(itemType)) {
    return;
  }
  let itemSize = ITEM_SIZE[itemType];
  let currentSection = itemSize;

  while (currentSection <= totalStorage) {
    yield currentSection;
    currentSection += itemSize;
  }
}

export function storageResolver(itemType: ItemType) {
  if (itemType === 'console') {
    return false;
  }

  return true;
}
