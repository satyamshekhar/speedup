// Improve dequeue from amortized O(1) to O(1).

var Queue = module.exports = function () {
    this._stack = [];
    this._reversed_stack = [];
};

Queue.prototype.enqueue = function (element) {
    this._stack.push(element);
    return this.size();
};

Queue.prototype.dequeue = function () {
    if (this._reversed_stack.length === 0) {
        this._reverseStack();
    }
    return this._reversed_stack.pop();
};

Queue.prototype.size = function () {
    return this._reversed_stack.length + this._stack.length;
};

Queue.prototype.empty = function () {
    return this.size() === 0;
};

Queue.prototype.clear = function () {
    delete this._stack;
    delete this._reversed_stack;
    this._stack = [];
    this._reversed_stack = [];
};

Queue.prototype.front = function () {
    if (this._reversed_stack.length === 0) {
        return this._stack[0];
    } else {
        return this._reversed_stack[this._reversed_stack.length - 1];
    }
};

Queue.prototype.forEach = function () {
    for (var i = this._reversed_stack.length - 1; i >= 0; --i) {
        fn(this._reversed_stack[i]);
    }
    for (var i = 0, l = this._stack.length; i < l; ++i) {
        fn(this._stack[i]);
    }
};

Queue.prototype.map = function () {
    for (var i = this._reversed_stack.length - 1; i >= 0; --i) {
        this._reversed_stack[i] = fn(this._reversed_stack[i]);
    }
    for (var i = 0, l = this._stack.length; i < l; ++i) {
        this_stack[i] = fn(this._stack[i]);
    }
}

Queue.prototype.toArray = function () {
    var array = [].concat()
    return this._reversed_stack.slice();
};


// Private Functions
Queue.prototype._reverseStack = function () {
    this._reversed_stack = this._stack.reverse();
    this._stack = [];
};
