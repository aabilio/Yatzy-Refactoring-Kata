const YATSY_SCORE: number = 50;
const NONE_SCORE: number = 0;
const ONES_VALUE: number = 1;
const TWOS_VALUE: number = 2;
const THREES_VALUE: number = 3;

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

  static score_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const first = (_dice: number, idx: number) => idx < 1;
    const double = (dice: number) => dice * 2;
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5])
      .filter(first)
      .map(double)
      .reduce(sum, 0);
  }

  static two_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const firstAndSecond = (_dice: number, idx: number) => idx < 2;
    const double = (dice: number) => dice * 2;
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5])
      .filter(firstAndSecond)
      .map(double)
      .reduce(sum, 0);
  }

  static four_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const first = (_dice: number, idx: number) => idx < 1;
    const byFour = (dice: number) => dice * 4;
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5], 4)
      .filter(first)
      .map(byFour)
      .reduce(sum, 0);
  }

  static three_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    const first = (_dice: number, idx: number) => idx < 1;
    const byThree = (dice: number) => dice * 3;
    return itemsRepeatedAtLeast([d1, d2, d3, d4, d5], 3)
      .filter(first)
      .map(byThree)
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
    var sum;
    sum = 0;
    for (let at = 0; at != 5; at++) {
      if (this.dice[at] == 4) {
        sum += 4;
      }
    }
    return sum;
  }

  fives(): number {
    let s = 0;
    var i;
    for (i = 0; i < this.dice.length; i++) if (this.dice[i] == 5) s = s + 5;
    return s;
  }

  sixes(): number {
    let sum = 0;
    for (var at = 0; at < this.dice.length; at++) if (this.dice[at] == 6) sum = sum + 6;
    return sum;
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

function highestDiceRepeatedTimes(dices: number[], times: number): number {
  const onlyRepeatedTimes = (times: number) => (dice: number, idx: number, arr: number[]) => itemsRepeatedAtLeast(arr, times).indexOf(dice) >= 0;
  const onlyUnique = (dice: number, idx: number, arr: number[]) => arr.indexOf(dice) === idx;
  const sortDescendent = (a: number, b: number): number => b - a;
  const getFirst = (_acc: number, _cur: number, _idx: number, arr: number[]) => arr[0];
  return dices
    .filter(onlyRepeatedTimes(times))
    .filter(onlyUnique)
    .sort(sortDescendent)
    .reduce(getFirst, 0);
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
