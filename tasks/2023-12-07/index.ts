type Letter = { [key: string]: number };

export function createTrackedLetter(
  letter: Letter,
  trackerFn: (...args: unknown[]) => unknown
): Letter {
  const trackedLetter = new Proxy(letter, {
    set(target, prop, value) {
      if (typeof prop === 'symbol') {
        return false;
      }
      if (target[prop] !== value) {
        trackerFn(prop, value);
      }
      target[prop] = value;
      return true;
    },
  });
  return trackedLetter;
}
