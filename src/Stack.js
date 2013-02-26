var Stack = module.exports = function () {
    this._stack = [];
};

Stack.prototype.push = function (element) {
    return this._stack.push(element);
};

Stack.prototype.pop = function () {
    return this._stack.pop();
};

Stack.prototype.size = function () {
    return this._stack.length;
};

Stack.prototype.empty = function () {
    return this._stack.length === 0;
};

Stack.prototype.clear = function () {
    delete this._stack;
    this._stack = [];
};

Stack.prototype.top = function () {
    return this._stack[this._stack.length - 1];
};

Stack.prototype.forEach = function (fn) {
    for (var i = this._stack.length - 1; i >= 0; --i) {
        fn(this._stack[i]);
    }
};

Stack.prototype.map = function (fn) {
    for (var i =  this._stack.length - 1; i >= 0; --i) {
        this._stack[i] = fn(this._stack[i]);
    }
};

Stack.prototype.toArray = function () {
    return this._stack.slice();
};
