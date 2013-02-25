var Queue = require("../src/Queue.js");
var assert = require("assert").ok;

var q = new Queue();
for (var i = 1; i < 5; i++)
    q.enqueue(i);

assert(q.enqueue(5) === 5);

assert(q.peek() === 1);

assert(q.dequeue() === 1);
assert(!q.empty());

assert(q.size() === 4);
assert(q.peek() === 2);

q.enqueue(6);
q.enqueue(9);

assert(q.dequeue() === 2);
assert(q.dequeue() === 3);
assert(q.dequeue() === 4);
assert(q.dequeue() === 5);

q.enqueue(10);

assert(q.dequeue() === 6);
assert(q.dequeue() === 9);
assert(q.dequeue() === 10);

q.clear();
assert(q.size() === 0);
assert(q.empty());
