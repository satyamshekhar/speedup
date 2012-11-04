var Queue = require("../src/Queue.js");
var assert = require("assert").ok;

var q = new Queue();
for (var i = 1; i < 5; i++)
    q.enqueue(i);

assert(q.enqueue(5) === 5);

assert(q.peek() === 1);

assert(q.dequeue() === 1);
assert(!q.isEmpty());

assert(q.size === 4);
assert(q.peek() === 2);

q.clear();
assert(q.size === 0);
assert(q.isEmpty());
