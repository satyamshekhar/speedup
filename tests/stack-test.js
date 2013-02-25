var Stack = require("../src/Stack.js");
var assert = require("assert").ok;

var stack = new Stack();
for (var i = 1; i < 5; i++)
    stack.push(i);
assert(stack.push(5) === 5);

assert(stack.pop() === 5);
assert(!stack.empty());

var c = 0;
stack.foreach(function(x) {c++});
assert(c === 4);

stack.map(function (x) {return ++x;});
assert(stack.size() === 4);
assert(stack.peek() === 5);

assert(stack.toArray());

stack.clear();
assert(stack.size() === 0);
assert(stack.empty());
