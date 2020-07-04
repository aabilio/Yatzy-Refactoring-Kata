const YATSY_SCORE: number = 50;
const NONE_SCORE: number = 0;
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
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5])
      .filter(firstItems(1))
      .map(multiplyBy(2))
      .reduce(sum, 0);
  }

  static two_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5])
      .filter(firstItems(2))
      .map(multiplyBy(2))
      .reduce(sum, 0);
  }

  static four_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5], 4)
      .filter(firstItems(1))
      .map(multiplyBy(4))
      .reduce(sum, 0);
  }

  static three_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5], 3)
      .filter(firstItems(1))
      .map(multiplyBy(3))
      .reduce(sum, 0);
  }

  static smallStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0];
    tallies[d1 - 1] += 1;
    tallies[d2 - 1] += 1;
    tallies[d3 - 1] += 1;
    tallies[d4 - 1] += 1;
    tallies[d5 - 1] += 1;
    if (tallies[0] == 1 && tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1) return 15;
    return 0;
  }

  static largeStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[d1 - 1] += 1;
    tallies[d2 - 1] += 1;
    tallies[d3 - 1] += 1;
    tallies[d4 - 1] += 1;
    tallies[d5 - 1] += 1;
    if (tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1 && tallies[5] == 1) return 20;
    return 0;
  }

  static fullHouse(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var tallies;
    var _2 = false;
    var i;
    var _2_at = 0;
    var _3 = false;
    var _3_at = 0;

    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[d1 - 1] += 1;
    tallies[d2 - 1] += 1;
    tallies[d3 - 1] += 1;
    tallies[d4 - 1] += 1;
    tallies[d5 - 1] += 1;

    for (i = 0; i != 6; i += 1)
      if (tallies[i] == 2) {
        _2 = true;
        _2_at = i + 1;
      }

    for (i = 0; i != 6; i += 1)
      if (tallies[i] == 3) {
        _3 = true;
        _3_at = i + 1;
      }

    if (_2 && _3) return _2_at * 2 + _3_at * 3;
    else return 0;
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

function sumEquals(dices: number[], value: number): number {
  return dices
      .filter(dice => dice === value)
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
