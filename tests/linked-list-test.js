var LL = require("../src/LinkedList.js");
var assert = require("assert").ok;
var util = require("util");

var ll = new LL();

var print = function () {
    for (var i = 0, l = ll.size; i < l; i++)
        console.log("i: %d --- %s",  i, util.inspect(ll.elementAt(i)));
};

var f = ll.insert(4);
var x = ll.insert(55);
var y = ll.insert(100);

var z = ll.insertAfter(57, x);
var xx = ll.insertBefore(56, z);
var xy = ll.insert(5, 1);
var zz = ll.insert(101);
var zzz = ll.insert(3, 0);

assert(ll.elementAt(0) === 3);//
assert(ll.elementAt(1) === 4);
assert(ll.elementAt(2) === 5);//
assert(ll.elementAt(3) === 55);
assert(ll.elementAt(4 === 56));
assert(ll.elementAt(5) === 57);
assert(ll.elementAt(6) === 100);
assert(ll.elementAt(7) === 101);//
assert(ll.size === 8);

ll.remove(2);
ll.remove(6);
ll.remove(0);

assert(ll.elementAt(0) === 4 &&
       ll.elementAt(1) === 55 &&
       ll.elementAt(2) === 56 &&
       ll.elementAt(3) === 57 &&
       ll.elementAt(4) === 100);

assert(ll.indexOf(56) === 2);
assert(ll.lastIndexOf(100) === 4);
assert(!ll.empty());
ll.clear();
assert(ll.empty());
assert(ll.size === 0);
