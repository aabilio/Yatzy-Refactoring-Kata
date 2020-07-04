const YATSY_SCORE: number = 50;
const NONE_SCORE: number = 0;

const TWICE = 2;
const THREE_TIMES = 3;
const FOUR_TIMES = 4;

const ONES_VALUE: number = 1;
const TWOS_VALUE: number = 2;
const THREES_VALUE: number = 3;
const FOURS_VALUE: number = 4;
const FIVES_VALUE: number = 5;
const SIXES_VALUE: number = 6;

export default class Yatzy {
  private dice: number[];

  constructor(d1: number, d2: number, d3: number, d4: number, d5: number) {
    this.dice = [d1, d2, d3, d4, d5];
  }

  static chance(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return [d1, d2, d3, d4, d5].reduce(sum, 0);
  }

  static yatzy(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const diceIsEqualsToFirstOne = (dice: number, _: number, array: number[]) => dice === array[0];
    const allEquals = [d1, d2, d3, d4, d5].every(diceIsEqualsToFirstOne);
    return allEquals ? YATSY_SCORE : NONE_SCORE;
  }

  static ones(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return sumEquals([d1, d2, d3, d4, d5], ONES_VALUE);
  }

  static twos(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return sumEquals([d1, d2, d3, d4, d5], TWOS_VALUE);
  }

  static threes(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return sumEquals([d1, d2, d3, d4, d5], THREES_VALUE);
  }

  static fours(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return sumEquals([d1, d2, d3, d4, d5], FOURS_VALUE);
  }

  static fives(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return sumEquals([d1, d2, d3, d4, d5], FIVES_VALUE);
  }

  static sixes(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return sumEquals([d1, d2, d3, d4, d5], SIXES_VALUE);
  }

  static score_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5], TWICE)
      .filter(firstItems(1))
      .map(multiplyBy(2))
      .reduce(sum, 0);
  }

  static two_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5], TWICE)
      .filter(firstItems(2))
      .map(multiplyBy(2))
      .reduce(sum, 0);
  }

  static three_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5], THREE_TIMES)
      .filter(firstItems(1))
      .map(multiplyBy(3))
      .reduce(sum, 0);
  }

  static four_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5], FOUR_TIMES)
      .filter(firstItems(1))
      .map(multiplyBy(4))
      .reduce(sum, 0);
  }

  static smallStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const dices = [d1, d2, d3, d4, d5].slice().sort();
    return (isSmallStraight(dices)) ? dices.reduce(sum) : NONE_SCORE;
  }

  static largeStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const dices = [d1, d2, d3, d4, d5].slice().sort();
    return (isLargeStraight(dices)) ? dices.reduce(sum) : NONE_SCORE;
  }

  static fullHouse(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const dices = [d1, d2, d3, d4, d5];
    const pairs = itemsRepeated(dices, 2);
    const threeOfAKind = itemsRepeated(dices, 3);
    return isFullHouse(dices)
      ? pairs.reduce(sum) * 2 + threeOfAKind.reduce(sum) * 3 : NONE_SCORE;
  }

  fours(): number {
    return Yatzy.fours(...this.dice);
  }

  fives(): number {
    return Yatzy.fives(...this.dice);
  }

  sixes(): number {
    return Yatzy.sixes(...this.dice);
  }
}

function isSmallStraight(dices: number[]): boolean {
  const SMALL_STRAIGHT = [1, 2, 3, 4, 5];
  return arrayEquals(SMALL_STRAIGHT, dices);
}

function isLargeStraight(dices: number[]): boolean {
  const LARGE_STRAIGHT = [2, 3, 4, 5, 6];
  return arrayEquals(LARGE_STRAIGHT, dices);
}

function isFullHouse(dices: number[]): boolean {
  const areTherePairs = itemsRepeated(dices, 2).length > 0;
  const areThereRhreeOfAKind = itemsRepeated(dices, 3).length > 0;
  return areTherePairs && areThereRhreeOfAKind;
}

function sumEquals(arr: number[], value: number): number {
  return arr
      .filter(item => item === value)
      .reduce(sum, 0);
}

function sum(a: number, b: number): number {
  return a + b;
}

function itemsRepeatedAtLeast(arr: number[], times: number = 2): number[] {
  const repetitions = itemRepetitions(arr);
  return Object
    .keys(repetitions)
    .map((key) => parseInt(key))
    .filter((key) => repetitions[key] >= times)
    .sort((a, b): number => b - a);
}

function itemsRepeated(arr: number[], times: number = 2): number[] {
  const repetitions = itemRepetitions(arr);
  return Object
    .keys(repetitions)
    .map((key) => parseInt(key))
    .filter((key) => repetitions[key] === times)
    .sort((a, b): number => b - a);
}

function itemRepetitions(arr: number[]): { [key: number]: number; } {
  return arr.reduce((acc: any, current: number) => ({
    ...acc, [current]: (acc[current] + 1) || 1
  }), {});
}

function firstItems(amount: number) {
  return (_: any, idx: number) => idx < amount;
}

function multiplyBy(factor: number) {
  return (num: number) => num * factor
};

function arrayEquals(a: number[], b: number[]): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
