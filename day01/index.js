const R = require("ramda");
const { fetchDataRows, s } = require("../lib/lib");

const solve_1 = (arr) => arr.reduce((acc, curr, i, arr) => i === 0 ? acc : curr > arr[i - 1] ? acc + 1 : acc, 0);
const makeWindows = (arr) => arr.map((_e, i, a) => a.slice(i, i + 3)).slice(0, -2);
const solve_2 = R.pipe(makeWindows, R.map(R.sum), solve_1);

R.pipe(fetchDataRows, R.map((d => +d)), s(solve_1, solve_2))("data.txt");