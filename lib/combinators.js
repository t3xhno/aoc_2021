// S-combinator
const s = (...fns) => (val) => fns.forEach(fn => console.log(fn(val)));

module.exports = { s };