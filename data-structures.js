us = require('underscore');
assert = require('assert').ok;
util = require('util');

/****** Stack ******/

function Stack() {
    this._stack = [];
    this.push.apply(this, arguments);
}

Stack.prototype = {
    push: function () {
        return this._stack.push.apply(this._stack, arguments);
    },

    pop: function () {
        if (this.empty()) {
            return undefined;
        }
        return this._stack.pop();
    },

    empty: function () {
        return this._stack.length === 0;
    },
 
    toArray: function () {
        return this._stack.slice();
    }
};

Stack.prototype.__defineGetter__('size', function () {
    return this._stack.length;
});

Stack.prototype.__defineGetter__('top', function () {
    return this._stack[this.size - 1];
});

/****** Queue ******/
function Queue() {
    this._stack = [];
    this._reversed_stack = [];

    this.push.apply(this, arguments);
}

Queue.prototype = {
    empty: function () {
        return (this._stack.length + this._reversed_stack.length) === 0;
    },

    push: function () {
        return this._stack.push.apply(this._stack, arguments);
    },

    pop: function () {
        if (this.empty()) {
            return undefined;
        }
        
        this._push_to_reverse_stack();

        return this._reversed_stack.pop();
    },

    _push_to_reverse_stack: function () {
        if (this._reversed_stack.length === 0) {
            this._reversed_stack.push.apply(this._reversed_stack, this._stack);
            this._stack = [];
        }
    },

    toArray: function () {
        return this._reversed_stack.concat(this._stack.reverse());
    }
};

Queue.prototype.__defineGetter__('size', function () {
    return this._reversed_stack.size + this._stack.size;
});
Queue.prototype.__defineGetter__('front', function () {
    this._push_to_reverse_stack();
    return this._reversed_stack[this._reversed_stack.length - 1];
});
Queue.prototype.__defineGetter__('back', function () {
    return this._stack.top;
});

/****** Heap ******/





/****** Exports ******/
exports.Stack = Stack;
exports.Queue = Queue;