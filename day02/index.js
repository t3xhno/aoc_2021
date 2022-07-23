const R = require("ramda");
const { fetchDataRows, s } = require("../lib/lib");

const r = /(\w)\w+ (\d+)/;
const step = ([d, i]) => d.match(/[fd]/) ? +i : -i;
const parse = (str) => str.match(r).slice(1, 3);
const compute = (arr) => arr.reduce(([x, y], e) => e[0].match(/[du]/) ? [x, y + step(e)] : [x + step(e), y], [0, 0]);
const computeWithAim = (arr) => arr.reduce(([x, y, aim], e) =>
  e[0].match(/[ud]/) ? [x, y, aim + (e[0].match(/d/) ? +e[1] : -e[1])] : [x + +e[1], y + +e[1] * aim, aim]
, [0, 0, 0]);

const solve_1 = R.pipe(R.map(parse), compute, R.product);
const solve_2 = R.pipe(R.map(parse), computeWithAim, R.take(2), R.product);

R.pipe(fetchDataRows, s(solve_1, solve_2))("data.txt");
