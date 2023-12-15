export interface Gift {
  value: number;
  weight: number;
  volume: number;
}

export function calculateMaxGiftValue(
  gifts: Gift[],
  maxWeight: number,
  maxVolume: number
): number {
  const numOfGifts = gifts.length;
  const dp: number[][][] = Array(numOfGifts + 1)
    .fill(0)
    .map(() =>
      Array(maxWeight + 1)
        .fill(0)
        .map(() => Array(maxVolume + 1).fill(0))
    );

  gifts.reduce((previousGifts, currentGift, i) => {
    const giftIndex = i + 1;
    previousGifts[giftIndex] = Array(maxWeight + 1)
      .fill(0)
      .map((_, currentWeight) =>
        Array(maxVolume + 1)
          .fill(0)
          .map((_, currentVolume) => {
            const canTakeGift =
              currentGift.weight <= currentWeight &&
              currentGift.volume <= currentVolume;
            if (canTakeGift) {
              const valueWithGift =
                currentGift.value +
                previousGifts[i][currentWeight - currentGift.weight][
                  currentVolume - currentGift.volume
                ];
              return valueWithGift;
            } else {
              return previousGifts[i][currentWeight][currentVolume];
            }
          })
      );
    return previousGifts;
  }, dp);

  return dp[numOfGifts][maxWeight][maxVolume];
}
