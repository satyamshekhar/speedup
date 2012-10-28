var Stack = require("../src/Stack.js");
var assert = require("assert").ok;

var stack = new Stack();
stack.push(1, 2, 3, 4);
assert(stack.push(5) === 5);

assert(stack.pop() === 5);
assert(!stack.empty());

var c = 0;
stack.foreach(function(x) {c++});
assert(c === 4);

stack.map(function (x) {return ++x;});
assert(stack.size === 4);
assert(stack.top === 5);

assert(stack.toArray());

stack.clear();
assert(stack.size === 0);
assert(stack.empty());
