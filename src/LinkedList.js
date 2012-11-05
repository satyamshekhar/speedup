var assert = require("assert").ok;

var LinkedList = module.exports = function LinkedList() {
    this._head = null;
    this._tail = null;
    this._size = 0;
};

var Node = exports.Node = function Node(obj) {
    this._prev = null;
    this._next = null;
    this.__defineGetter__("prev", function () {
        return this._prev;
    });
    this.__defineGetter__("next", function () {
        return this._next;
    });
    this.data = obj;
};

// assume that typeof index is number.
// if index is out of range, we insert at end.
LinkedList.prototype.insert = function (obj, index) {
    var node = this._createNodeIfNot(obj);
    index = index === undefined ? this._size : index;
    assert(index <= this._size && index >= 0);

    if (this._size === 0) {
        this._head = this._tail = node;
        ++this._size;
        return node;
    }

    if (index === 0) {
        return this.insertBefore(node, this._head);
    } else {
        var prev_node = this.nodeAt(index - 1);
        return this.insertAfter(node, prev_node);
    }
};

LinkedList.prototype.insertAfter = function (obj, prev_node) {
    var node = this._createNodeIfNot(obj);
    assert(prev_node && prev_node.constructor === Node);
    if (prev_node === this._tail) this._tail = node;
    node._next = prev_node._next;
    node._prev = prev_node;
    prev_node._next = node;
    if (node._next) node._next._prev = node;
    ++this._size;
    return node;
};

LinkedList.prototype.insertBefore = function (obj, next_node) {
    var node = this._createNodeIfNot(obj);
    assert(next_node && next_node.constructor === Node);
    if (next_node === this._head) this._head = node;
    node._next = next_node;
    node._prev = next_node._prev;
    next_node._prev = node;
    if (node._prev) node._prev._next = node;
    ++this._size;
    return node;
};

LinkedList.prototype.elementAt = function (index) {
    var node = this.nodeAt(index);
    return node ? node.data : undefined;
};

LinkedList.prototype.nodeAt = function (index) {
    if (index >= this._size || index < 0) return undefined;
    if (index < this._size/2) {
        var node = this._head;
        for (var i = 0 ; i < index ; i++) {
            node = node._next;
        }
        return node;
    } else {
        var node = this._tail;
        for (var i = 0, l = this._size - 1 - index; i < l ; i++) {
            node = node._prev;
        }
        return node;
    }
};

LinkedList.prototype.__defineGetter__("size", function () {
    return this._size;
});


LinkedList.prototype.clear = function () {
    this._head = null;
    this._tail = null;
    this._size = 0;
};

LinkedList.prototype.indexOf = function (obj) {
    var node = this._head;
    for (var i = 0, l = this._size; i < l && node; i++) {
        if (node.data === obj) {
            return i;
        }
        node = node._next;
    }
    return -1;
};

LinkedList.prototype.lastIndexOf = function (obj) {
    var node = this._tail;
    for (var i = 0, l = this._size; i < l && node; i++) {
        if (node.data === obj) {
            return this.size - 1 - i;
        }
    }
    return -1;
};

LinkedList.prototype.isEmpty = function () {
    return this._size === 0;
};

LinkedList.prototype.remove = function (index) {
    assert(index < this._size && index >= 0);
    var node = this.nodeAt(index);
    if (node !== this._head) {
        node._prev._next = node._next;
    } else {
        this._head = node._next;
        if (this._head._prev) this._head._prev = null;
    }

    if (node !== this._tail) {
        node._next._prev = node._prev;
    } else {
        this._tail = node._prev;
        if (this._tail._next) this._tail._next = null;
    }

    delete node._next && delete node._prev;
    return --this._size;
};

// Private Methods
LinkedList.prototype._createNodeIfNot = function (obj) {
    return obj.constructor === Node ? obj : new Node(obj);
};
