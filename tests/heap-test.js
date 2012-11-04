var Heap = require("../src/Heap.js");
var assert = require("assert").ok;

var minHeap = new Heap(null, 3);
assert(minHeap.isEmpty());

minHeap.insert(2);
minHeap.insert(3);
minHeap.insert(6);
minHeap.insert(5);
assert(minHeap.insert(2) === 5);


var x = minHeap.remove();
assert(x.key === 2);
x = minHeap.remove();
assert(x.key === 2);
x = minHeap.remove();
assert(x.key === 3);

assert(!minHeap.isEmpty());
assert(minHeap.size === 2);
