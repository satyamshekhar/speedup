var Queue = require("../src/Queue.js");
var assert = require("assert").ok;

var q = new Queue();
q.push(1, 2, 3, 4);
assert(q.push(5) === 5);

assert(q.front === 1);
assert(q.back === 5);

assert(q.pop() === 1);
assert(!q.empty());

assert(q.size === 4);
assert(q.front === 2);
assert(q.back === 5);

q.clear();
assert(q.size === 0);
assert(q.empty());
