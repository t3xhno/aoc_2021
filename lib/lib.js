const fs = require("fs");
const R = require("ramda");

// S-combinator
const s = (...fns) => (val) => fns.forEach(fn => console.log(fn(val)));

const getInput = (fName) => fs.readFileSync(fName).toString();
const splitInput = (str) => str.trim().split(/\n/g);
const fetchDataRows = R.pipe(getInput, splitInput);

module.exports = { fetchDataRows, s };

