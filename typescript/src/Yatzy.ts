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
    const removeItemByIndex = (arr: number[], idx: number) => arr.slice(0, idx).concat(arr.slice(idx + 1));
    const onlyRepeated = (dice: number, idx: number, arr: number[]) => removeItemByIndex(arr, idx).indexOf(dice) >= 0;
    const onlyUnique = (dice: number, idx: number, arr: number[]) => arr.indexOf(dice) === idx;
    const sortDescendent = (a: number, b: number): number => b - a;
    const getFirst = (_acc: number, _cur: number, _idx: number, arr: number[]) => arr[0];
    const highestDiceRepeated = [d1, d2, d3, d4, d5]
      .filter(onlyRepeated)
      .filter(onlyUnique)
      .sort(sortDescendent)
      .reduce(getFirst, 0);
    return highestDiceRepeated * 2;
  }

  static two_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    counts[d1 - 1]++;
    counts[d2 - 1]++;
    counts[d3 - 1]++;
    counts[d4 - 1]++;
    counts[d5 - 1]++;
    var n = 0;
    var score = 0;
    for (let i = 0; i < 6; i += 1)
      if (counts[6 - i - 1] >= 2) {
        n++;
        score += 6 - i;
      }
    if (n == 2) return score * 2;
    else return 0;
  }

  static four_of_a_kind(_1: number, _2: number, d3: number, d4: number, d5: number): number {
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[_1 - 1]++;
    tallies[_2 - 1]++;
    tallies[d3 - 1]++;
    tallies[d4 - 1]++;
    tallies[d5 - 1]++;
    for (let i = 0; i < 6; i++) if (tallies[i] >= 4) return (i + 1) * 4;
    return 0;
  }

  static three_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var t;
    t = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    t[d1 - 1]++;
    t[d2 - 1]++;
    t[d3 - 1]++;
    t[d4 - 1]++;
    t[d5 - 1]++;
    for (let i = 0; i < 6; i++) if (t[i] >= 3) return (i + 1) * 3;
    return 0;
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
