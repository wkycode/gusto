interface Prize {
  id: number;
  name: string;
  slug: string;
  probability: number;
  hasQuota: boolean;
}

const weightedRandom = (items: { value: string; weight: number }[]) => {
  const total_weight = items.reduce((acc, cur) => acc + cur.weight, 0);
  let random_number = Math.random() * total_weight;
  for (let i = 0; i < items.length; i++) {
    if (random_number < items[i].weight) {
      return items[i].value;
    }
    random_number -= items[i].weight;
  }
};

const drawPrize = (prize: Prize[]) => {
  const weighted_prize_array = prize.map((ele) => ({
    value: ele.slug,
    weight: ele.probability,
  }));
  const prize_drawn = weightedRandom(weighted_prize_array);
  console.log(prize_drawn);
};

export default drawPrize;
