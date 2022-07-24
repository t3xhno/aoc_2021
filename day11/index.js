const R = require("ramda");
const { tLog, fetchDataRows, S } = require("../lib/lib");

const dirs = [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
const hasNeighbour = (m, i, j, [dx, dy]) => i + dx >= 0 && i + dx <= m[i].length - 1 && j + dy >= 0 && j + dy <= m.length - 1;
// e: 0 - didn't explode, not about to, 1 - exploding in same tick next, 2 - exploded and done this tick
const objectify = (eLvl) => ({ e: 0, v: eLvl });
const shouldExplode = (octopus) => octopus.v + 1 >= 9 && octopus.e !== 2;

const solve_1 = R.pipe(
  R.map(R.split("")),
  R.map(R.map(o => +o)),
  R.map(R.map(objectify)),
);

R.pipe(fetchDataRows, S(solve_1), tLog)("example.txt");
