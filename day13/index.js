const R = require("ramda");
const { tLog, fetchDataRows, S, F  } = require("../lib");

const getCoordinates = (arr) => [arr.slice(0, -3)];
const findMax = R.pipe(R.map(d => +d), R.reduce(R.max, 0));
const findMaxX = R.pipe(R.pluck("x"), findMax);
const findMaxY = R.pipe(R.pluck("y"), findMax);
const combine = (a, b) => [a, b];
const findMaxCoords = R.pipe(R.map(c => c.match(/(?<x>\d+),(?<y>\d+)/).groups), F(combine, findMaxX, findMaxY));
const plotPaper = R.pipe(
  getCoordinates,
  R.flatten,
  F(combine, findMaxCoords, ),
);
const getInstructions = R.pipe(R.slice(-2, Infinity), R.map(i => i.match(/fold along (?<axis>\w)=(?<val>\d+)/).groups));

const solve_1 = R.pipe(
  S(getInstructions, plotPaper),
);

R.pipe(fetchDataRows, S(solve_1), tLog)("example.txt");
