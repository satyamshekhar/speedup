var AVLTree = require("../src/AVLTree.js");
var assert = require("assert").ok;

var tree = new AVLTree();

var input = [1, 15, 10, 101, 3, 88, 45, 80, 73];
var sorted;

console.log(input);

function p2(exp) {
    var x = 1;
    while (exp--) {
        x *= 2;
    }
    return x;
};

function printTree() {
    var root = tree._root;
    var x = [];
    x.push(root);
    while (x.length !== 0) {
        var h = x.shift();
        if (!h) continue;
        console.log("node: %d", h.value);
        console.log("parent: %s", h.parent? h.parent.value : h.parent);
        console.log("left: %s", h.left ? h.left.value : h.left);
        console.log("right: %s", h.right ? h.right.value : h.right);
        x.push(h.left);
        x.push(h.right);
    }
}

for (var i = 0, l = input.length; i < l; i++) {
    var n = tree.insert(input[i], input[i]);
    // assert(p2(tree.height) >= input.length);
    assert(n.key === input[i]);
    assert(n.value === input[i]);
    var min = tree.getMin();
    sorted = input.slice(0, i + 1).sort(function (a, b){return a > b;});
    for (var j = 0; j <= i; j++) {
        assert(min.value === sorted[j]);
        min = min.successor();
    }
}

assert(tree.size === input.length);
assert(input[6] === tree.lookup(input[6]));
assert(undefined === tree.lookup(sorted[sorted.length - 1] + 10));
assert(input[2] === tree.lookupNode(input[2]).value);

tree.remove(input[8]);
input.splice(8, 1);
sorted = input.slice().sort(function (a, b) {
    return a > b;
});

min = tree.getMin();
for (var j = 0, l = sorted.length; j < l; j++) {
    assert(min.value === sorted[j]);
    min = min.successor();
}
