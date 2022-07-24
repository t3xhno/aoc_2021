const R = require("ramda");
const { tLog, fetchDataRows, combineToArray, S, F  } = require("../lib");

const getBase = R.slice(0, 1);
const getRules = R.pipe(R.slice(3, Infinity), R.map(x => x.match(/(?<rule>[A-Z]{2}) -> (?<in>[A-Z])/).groups));
const makeWindows = (arr) => arr.map(e => e.split("").map((_e, i, a) => a.slice(i, i + 2)).slice(0, -1));
const doIt = (arr) => console.log(arr);
const applyRules = R.pipe(R.over(R.lensIndex(0), R.pipe(makeWindows, R.unnest, R.map(R.join("")))), doIt);


const solve_1 = R.pipe(
  F(combineToArray, getBase, getRules),
  applyRules,
);

R.pipe(fetchDataRows, S(solve_1), tLog)("example.txt");
