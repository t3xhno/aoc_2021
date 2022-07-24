const fs = require("fs");
const R = require("ramda");

const tLog = R.tap((a) => console.dir(a, { depth: null }));

const window = (size) => (arr) => arr.map((_e, i, a) => a.slice(i, i + size)).slice(0, -(size - 1));

// S-combinator
const S = (...fns) => (val) => fns.reduce((acc, fn) => acc.concat(fn(val)), []);
const Y = (...fns) => (val) => fns.reduce((acc, fn) => fn(acc), val);
const F = (join, fn1, fn2) => (val) => join(fn1(val), fn2(val));

const combineToArray = (...xs) => [...xs];

const getInput = (fName) => fs.readFileSync(fName).toString();
const splitInput = (str) => str.trim().split(/\n/g);
const fetchDataRows = R.pipe(getInput, splitInput);

module.exports = { tLog, getInput, fetchDataRows, combineToArray, window, S, F, Y };

