const R = require("ramda");
const { tLog, fetchDataRows, S } = require("../lib/lib");

const bracket = {
  ")": { score: 3, closes: "(" },
  "]": { score: 57, closes: "[" },
  "}": { score: 1197, closes: "{" },
  ">": { score: 25137, closes: "<" },
  "(": { closedBy: ")", score: 1 },
  "[": { closedBy: "]", score: 2 },
  "{": { closedBy: "}", score: 3 },
  "<": { closedBy: ">", score: 4 },
};

const isClosing = (char) => char.match(/[\)\]\>\}]/);
const scoreIt = (total, b) => total * 5 + bracket[bracket[b].closes].score;

const parseLine = (str) => str.split("").reduce(({ o, err }, e) =>
  !isClosing(e) ? { o: [...o, e], err }
    : bracket[e].closes === R.last(o) ? { o: R.init(o), err }
    : { o, err: [...err, e] }
, { o: [], err: [] });

const solve_1 = R.pipe(
  R.map(parseLine),
  R.pluck("err"),
  R.filter(n => n.length > 0),
  R.pluck(0),
  R.map((n) => bracket[n].score),
  R.sum,
);

const solve_2 = R.pipe(
  R.map(parseLine),
  R.filter(n => n.err.length === 0),
  R.pluck("o"),
  R.map(R.reverse),
  R.map(R.map(b => bracket[b].closedBy)),
  R.map(R.reduce(scoreIt, 0)),
  R.sort(R.subtract),
  R.median,
);

R.pipe(fetchDataRows, S(solve_1, solve_2), tLog)("data.txt");
