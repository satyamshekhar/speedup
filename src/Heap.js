var assert = require("assert").ok;

var swap = function (A, i, j) {
    var x = A[i];
    A[i] = A[j];
    A[j] = x;
};

// Default operator <
// if typeof comparator === Fn, then Fn(a) < Fn(b)
// if typeof comparator === key, then a.key < b.key
var Heap = module.exports = function Heap(arity) {
    this._heap = [];
    this._size = 0;

    arity = arity || 2;

    if (arity === 2) {
        this._parent = function (i) {
            return (i - 1) >> 1;
        };
    } else {
        this._parent = function (i) {
            return ((i - 1) / arity) >> 0;
        };
    };

    this._children = function (i) {
        var children = [arity * i + 1];
        if (children[0] >= this._size) return [];
        for (var c = 1; c < arity && children[c-1] < this._size - 1; c++) {
            children.push(children[c - 1] + 1);
        }
        return children;
    };
};

// assume key is a number.
Heap.prototype.insert = function (key, value) {
    this._heap[this._size] = {key: key, value: value};
    ++this._size;
    this._pullUp(this._size - 1);
    return this._size;
};

Heap.prototype.remove = function () {
    if (this._size === 0) return undefined;
    var top = this._heap[0];
    this._heap[0] = this._heap.pop();
    --this._size;
    this._pushDown(0);
    return top;
};

Heap.prototype.peek = function () {
    return this._heap[0];
};

Heap.prototype.isEmpty = function () {
    return this._size === 0;
};

Heap.prototype.__defineGetter__("size", function () {
    return this._size;
});

Heap.prototype._pullUp = function (ind) {
    if (ind === 0) return;
    var parent = this._parent(ind);
    while (this._heap[parent].key > this._heap[ind].key) {
        swap(this._heap, parent, ind);
        ind = parent;
        parent = this._parent(ind);
    }
};

Heap.prototype._pushDown = function (ind) {
    while (true) {
        var children = this._children(ind);
        if (children.length === 0) return;

        var min = children[0];
        for (var i = 1, l = children.length; i < l; i++) {
            if (this._heap[children[i]].key < this._heap[min].key) {
                min = children[i];
            }
        }

        if (this._heap[min].key < this._heap[ind].key) {
            swap(this._heap, ind, min);
            ind = min;
        } else {
            break;
        }
    }
};
