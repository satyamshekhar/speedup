var Stack = module.exports = function () {
    this._stack = [];
};

Stack.prototype.push = function (element) {
    return this._stack.push(element);
};

Stack.prototype.pop = function () {
    return this._stack.pop();
};

Stack.prototype.isEmpty = function () {
    return this._stack.length === 0;
};

Stack.prototype.clear = function () {
    delete this._stack;
    this._stack = [];
};

Stack.prototype.peek = function () {
    return this._stack[this._stack.length - 1];
};

Stack.prototype.foreach = function (Fn) {
    for (var i = 0, l = this._stack.length; i < l; i++) {
        Fn(this._stack[i]);
    }
};

Stack.prototype.map = function (Fn) {
    for (var i = 0, l = this._stack.length; i < l; i++) {
        this._stack[i] = Fn(this._stack[i]);
    }
};

Stack.prototype.toArray = function () {
    return this._stack.slice();
};

Stack.prototype.__defineGetter__('size', function () {
    return this._stack.length;
});
