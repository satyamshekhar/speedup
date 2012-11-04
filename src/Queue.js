var Queue = module.exports = function () {
    this._stack = [];
    this._reversed_stack = [];
};

Queue.prototype.enqueue = function (element) {
    this._stack.push(element);
    return this.size;
};

Queue.prototype.dequeue = function () {
    this._pushToReverseStack();
    return this._reversed_stack.pop();
};

Queue.prototype.isEmpty = function () {
    return this.size === 0;
};

Queue.prototype.toArray = function () {
    this._pushToReverseStack();
    return this._reversed_stack.slice();
};

Queue.prototype.clear = function () {
    delete this._stack;
    delete this._reversed_stack;
    this._stack = [];
    this._reversed_stack = [];
};

Queue.prototype.peek = function () {
    if (this._reversed_stack.length === 0) {
        return this._stack[0];
    } else {
        return this._reversed_stack[this._reversed_stack.length - 1];
    }
};

Queue.prototype.__defineGetter__("size", function () {
    return this._reversed_stack.length + this._stack.length;
});

// Private Functions
Queue.prototype._pushToReverseStack = function () {
    this._reversed_stack = this._reversed_stack.concat(this._stack.reverse());
    this._stack = [];
};
