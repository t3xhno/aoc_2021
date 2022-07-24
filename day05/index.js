const R = require("ramda");
const { tLog, fetchDataRows, S, F } = require("../lib/lib");

const parseRow = (str) => str.trim().match(/((?<x1>\d+),(?<y1>\d+)) -> ((?<x2>\d+),(?<y2>\d+))/).groups;
const isHV = ({ x1, x2, y1, y2 }) => x1 === x2 || y1 === y2;
const maxX = (arr) => Math.max(...arr.map(({ x1, x2 }) => Math.max(x1, x2)));
const maxY = (arr) => Math.max(...arr.map(({ y1, y2 }) => Math.max(y1, y2)));
const joinSize = (x, y) => [x, y];
const joinAll = (a, b) => [a, b];
const updateRows = (m, y1, y2, x) => m.map((r, i) => i === x ? r.map((e, j) => j >= Math.min(y1, y2) && j <= Math.max(y1, y2) ? e + 1 : e) : r);
const updateColumns = (m, x1, x2, y) => m.map((r, i) => i >= Math.min(x1, x2) && i <= Math.max(x1, x2) ? r.map((e, j) => j === y ? e + 1 : e) : r);
const makeMatrix = ([[sizeX, sizeY], lines]) => lines.reduce((acc, { x1, x2, y1, y2 }) =>
  y1 === y2 ? updateRows(acc, +x1, +x2, +y1) : updateColumns(acc, +y1, +y2, +x1)
, new Array(sizeX + 1).fill(new Array(sizeY + 1).fill(0)));

const solve_1 = R.pipe(
  R.identity,
  R.map(parseRow),
  R.filter(isHV),
  F(joinAll, F(joinSize, maxX, maxY), R.identity),
  makeMatrix,
  R.flatten,
  R.filter(x => x >= 2),
  R.length);

const solve_2 = R.pipe(
  R.identity,
);

R.pipe(fetchDataRows, S(solve_1), tLog)("data.txt");
