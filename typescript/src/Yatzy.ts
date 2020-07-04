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
  private dices: number[];

  constructor(d1: number, d2: number, d3: number, d4: number, d5: number) {
    this.dices = [d1, d2, d3, d4, d5];
  }

  static chance(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).chance();
  }

  static yatzy(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).yatzy();
  }

  static ones(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).ones();
  }

  static twos(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).twos();
  }

  static threes(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).threes();
  }

  static fours(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).fours();
  }

  static fives(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).fives();
  }

  static sixes(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).sixes();
  }

  static score_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).score_pair();
  }

  static two_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).two_pair();
  }

  static three_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).three_of_a_kind();
  }

  static four_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).four_of_a_kind();
  }

  static smallStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).smallStraight();
  }

  static largeStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).largeStraight();
  }

  static fullHouse(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return new Yatzy(d1, d2, d3, d4, d5).fullHouse();
  }

  chance(): number {
    return this.dices.reduce(sum, 0);
  }

  yatzy(): number {
    return this.isYatzy(this.dices) ? YATSY_SCORE : NONE_SCORE;
  }

  ones(): number {
    return sumEquals(this.dices, ONES_VALUE);
  }

  twos(): number {
    return sumEquals(this.dices, TWOS_VALUE);
  }

  threes(): number {
    return sumEquals(this.dices, THREES_VALUE);
  }

  fours(): number {
    return sumEquals(this.dices, FOURS_VALUE);
  }

  fives(): number {
    return sumEquals(this.dices, FIVES_VALUE);
  }

  sixes(): number {
    return sumEquals(this.dices, SIXES_VALUE);
  }

  score_pair(): number {
    return itemsRepeatedAtLeast(this.dices, TWICE)
      .filter(firstItems(1))
      .map(multiplyBy(2))
      .reduce(sum, 0);
  }

  two_pair(): number {
    return itemsRepeatedAtLeast(this.dices, TWICE)
      .filter(firstItems(2))
      .map(multiplyBy(2))
      .reduce(sum, 0);
  }

  three_of_a_kind(): number {
    return itemsRepeatedAtLeast(this.dices, THREE_TIMES)
      .filter(firstItems(1))
      .map(multiplyBy(3))
      .reduce(sum, 0);
  }

  four_of_a_kind(): number {
    return itemsRepeatedAtLeast(this.dices, FOUR_TIMES)
      .filter(firstItems(1))
      .map(multiplyBy(4))
      .reduce(sum, 0);
  }

  smallStraight(): number {
    const sortedDices = this.dices.slice().sort();
    return (this.isSmallStraight(sortedDices)) ? sortedDices.reduce(sum) : NONE_SCORE;
  }

  largeStraight(): number {
    const sortedDices = this.dices.slice().sort();
    return (this.isLargeStraight(sortedDices)) ? sortedDices.reduce(sum) : NONE_SCORE;
  }

  fullHouse(): number {
    return this.isFullHouse(this.dices) ? this.score_pair() + this.three_of_a_kind() : NONE_SCORE;
  }

  private isYatzy(dices: number[]): boolean {
    return allEquals(dices);
  }

  private isSmallStraight(dices: number[]): boolean {
    const SMALL_STRAIGHT = [1, 2, 3, 4, 5];
    return arrayEquals(SMALL_STRAIGHT, dices.slice().sort());
  }

  private isLargeStraight(dices: number[]): boolean {
    const LARGE_STRAIGHT = [2, 3, 4, 5, 6];
    return arrayEquals(LARGE_STRAIGHT, dices.slice().sort());
  }

  private isFullHouse(dices: number[]): boolean {
    const areTherePairs = itemsRepeated(dices, 2).length > 0;
    const areThereRhreeOfAKind = itemsRepeated(dices, 3).length > 0;
    return areTherePairs && areThereRhreeOfAKind;
  }
}

function allEquals(arr: number[]): boolean {
  const isEqualsToFirstOne = (current: number, _: number, array: number[]) => current === array[0];
  return arr.every(isEqualsToFirstOne);
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
