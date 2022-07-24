const R = require("ramda");
const { tLog, fetchDataRows, S } = require("../lib/lib");

const easyDigitLengths = /[2347]/;
const isEasyDigit = (num) => num.toString().match(easyDigitLengths);

const solve_1 = R.pipe(
  R.map(R.split(/\s\|\s/)),
  R.pluck(1),
  R.map(R.split(/\s/)),
  R.flatten,
  R.map(R.length),
  R.filter(isEasyDigit),
  R.length);

R.pipe(fetchDataRows, S(solve_1), tLog)("data.txt");
