var assert = require('assert').ok;
var exceptions = require('exceptions');

function LinkedList() {
    this._head = null;
    this._tail = null;
    this._size = 0;
}

LinkedList.prototype = {
    _new_node: function (obj) {
        if (obj === null || obj === undefined) {
            throw exception.NullPointerException;
        }
        return {
            prev: null,
            next: null,
            obj: obj
        };
    },

    _get_node: function (index) {
        //-1 when finding the place for element 
        //to be inserted at index 0
        assert(index < this._size && index > -2);
        
        if (index < 0) {
            return null;
        }
        
        var node = this._head;
        var i;
        for (i = 0 ; i < index ; i++) {
            node = node.next;
        }
        return node;
    },

    get: function (index) {
        if (index >= this._size || index < 0) {
            throw exceptions.OutOfBoundException;
        }
        var node = this._get_node(index);
        return node.obj;
    },

    getFirst: function () {
        if (this._size < 1) {
            throw exception.NoSuchElementException;
        }
        return this.get(0);
    },
    
    getLast: function () {
        if (this._size < 1) {
            throw exception.NoSuchElementException;
        }
        this.get(this._size - 1);
    },

    //Every add method uses this.
    //increasing the size in this.
    _add_after: function (obj, prev_node) {
        var node = this._new_node(obj);

        if (prev_node === null) {
            node.next = this._head;
            this._head = node;
        } else {
            node.next = prev_node.next;
            prev_node.next = node;
            node.prev = prev_node;
        }
        
        if (prev_node === this._tail) {
            this._tail = node;
        }
        
        ++this._size;
        
        return node;
    },

    add: function (obj, index) {
        index = index === undefined ? this._size : index;

        if (index > this._size || index < 0) {
            throw exceptions.OutOfBoundException;
        }
        
        this._add_after(obj, this._get_node(index - 1));
    },

    addFirst: function (obj) {
        this._add_after(obj, null);
    }, 

    addLast: function (obj) {
        this.add(obj);
    },
    
    addAll: function () {
        this.addAllFromIndex(arguments, this._size - 1);
    },
    
    addAllFromIndex: function (args, index) {
        if (index > this._size || index < 0) {
            throw exceptions.OutOfBoundException;
        }

        var prev_node = this._get_node(index - 1);
        var i, len;
        for (i = 0, len = args.length; i < len ; i++) {
            var node = this._add_after(args[i], prev_node);
            prev_node = node;
        }
    },

    clear: function () {
        this._head = null;
        this._tail = null;
        this._size = 0;
    },
    
    indexOf: function (obj) {
        var node = this._head;
        var i = 0;
        while (node !== null) {
            if (node.obj === obj) {
                return i;
            }
            ++i;
        }
        return -1;
    },
    
    lastIndexOf: function (obj) {
        var node = this._head;
        var index = -1;
        var i = 0;
        while (node !== null) {
            if (node.obj === obj) {
                index = i;
            }
        }
        return index;
    },

    remove: function (index) {
        if (index > this._size || index < 0) {
            throw exceptions.OutOfBoundException;
        }
        
        //remove reference - let GC clean up
        var node = this._get_node(index);
        if (node.prev !== null) {
            node.prev.next = node.next;
        }
        if (node.next !== null) {
            node.next.prev = node.prev;
        }
        
        --this._size;
    },

    removeFirst: function () {
        if (this._size < 1) {
            throw exception.NoSuchElementException;
        }
        this.remove(0);
    },
    
    removeLast: function () {
        if (this._size < 1) {
            throw exception.NoSuchElementException;
        }
        this.remove(this._size - 1);
    },
    
    size: function () {
        return this._size;
    }
};

exports.LinkedList = LinkedList;