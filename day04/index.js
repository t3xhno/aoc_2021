const R = require("ramda");
const { getInput, S, F, Y } = require("../lib/lib");

const tLog = R.tap((a) => console.dir(a, { depth: null }));

const combine = (str1, str2) => [str1, str2];
const getHeader = (str) => str.match(/^.*$/m)[0];
const getBoards = (str) => R.tail(str.split(/\n\n/));
const splitIt = F(combine, getHeader, getBoards);
const removeNewline = (str) => str.replace(/\n/g, " ");
const normalizeWhitespace = (str) => str.replace(/\s+/g, " ").trim();
const convert = (str) => str.split(/\s/g).map((e) => ({ k: e, v: false }));
const parseBoards = (arr) => arr.map((a) => Y(removeNewline, normalizeWhitespace, convert)(a));

const solve_1 = R.pipe(splitIt, R.over(R.lensIndex(1), parseBoards));
const solve_2 = R.pipe(R.identity);

R.pipe(getInput, S(solve_1), tLog)("example.txt");
