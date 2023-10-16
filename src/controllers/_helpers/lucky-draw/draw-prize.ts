interface Prize {
  id: number;
  name: string;
  slug: string;
  probability: number;
  hasQuota: boolean;
}

// Prize Functions
const weightedRandom = (items: { value: number; weight: number }[]) => {
  const total_weight = items.reduce((acc, cur) => acc + cur.weight, 0);
  let randomNumber = Math.random() * total_weight;
  for (let i = 0; i < items.length; i++) {
    if (randomNumber < items[i].weight) {
      return items[i].value;
    }
    randomNumber -= items[i].weight;
  }
};

const drawPrize = (prize: Prize[]): number | undefined => {
  const weighted_prize_array = prize.map((ele) => ({
    value: ele.id,
    weight: ele.probability,
  }));
  const prize_drawn = weightedRandom(weighted_prize_array);
  return prize_drawn;
};
// End of Prize Functions

export { drawPrize };
