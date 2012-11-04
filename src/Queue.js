var Queue = module.exports = function () {
    this._stack = [];
    this._reversed_stack = [];
};

Queue.prototype.push = function (element) {
    this._stack.push(element);
    return this.size;
};

Queue.prototype.pop = function () {
    this._push_to_reverse_stack();
    return this._reversed_stack.pop();
};

Queue.prototype.empty = function () {
    return this.size === 0;
};

Queue.prototype.toArray = function () {
    this._push_to_reverse_stack();
    return this._reversed_stack.slice();
};

Queue.prototype.clear = function () {
    delete this._stack;
    delete this._reversed_stack;
    this._stack = [];
    this._reversed_stack = [];
};

Queue.prototype.__defineGetter__("size", function () {
    return this._reversed_stack.length + this._stack.length;
});

Queue.prototype.__defineGetter__("front", function () {
    if (this._reversed_stack.length === 0) {
        return this._stack[0];
    } else {
        return this._reversed_stack[this._reversed_stack.length - 1];
    }
});

Queue.prototype.__defineGetter__("back", function () {
    if (this._stack.length === 0) {
        return this._reversed_stack[0];
    } else {
        return this._stack[this._stack.length - 1];
    }
});

// Private Functions
Queue.prototype._push_to_reverse_stack = function () {
    this._reversed_stack = this._reversed_stack.concat(this._stack.reverse());
    this._stack = [];
};
