var assert = require("assert").ok;

var Node = function (key, value) {
    this.key    = key;
    this.value  = value;
    this.left   = null;
    this.right  = null;
    this.height = 1;
    this.weight = 1;
    this.parent = null;
};

Node.prototype.successor = function () {
    if (this.right !== null) {
        return Tree.prototype.getMin(this.right);
    }
    var node = this;
    while (node.isRightChild()) {
        node = node.parent;
    }
    return node.parent;
};

Node.prototype.predecessor = function () {
    if (this.left !== null) {
        return Tree.prototype.getMax(this.left);
    }
    var node = this;
    while(node.isLeftChild()) {
        node = node.parent;
    }
    return node.parent;
};

Node.prototype.isLeftChild = function () {
    return this.parent && this.parent.left === this;
};

Node.prototype.isRightChild = function () {
    return this.parent && this.parent.right === this;
};

Node.prototype.isOrphan = function () {
    return this.parent === null;
};

Node.prototype.isLeaf = function () {
    return !this.left && !this.right;
};

Node.prototype.setLeftChild = function (child) {
    this.left = child;
    if (child) {
        child.parent = this;
    }
};

Node.prototype.setRightChild = function (child) {
    this.right = child;
    if (child) {
        child.parent = this;
    }
};

Node.prototype.isChildOf = function (parent) {
    if (!parent || this === parent) {
        return false;
    }
    var node = this;
    while(node.parent && node.parent !== parent) {
        node = node.parent;
    }
    return !!node;
};

Node.prototype._balance_factor = function () {
    var lheight = this.left ? this.left.height : 0;
    var rheight = this.right ? this.right.height : 0;
    return lheight - rheight;
};

Node.prototype._update_info = function () {
    var lheight = this.left ? this.left.height : 0;
    var rheight = this.right ? this.right.height : 0;
    this.height = (lheight > rheight ? lheight : rheight) + 1;
    this.weight = (this.left ? this.left.weight : 0) +
        (this.right ? this.right.weight : 0) + 1;
};

var Tree = module.exports = function () {
    this._root = null;
};

Tree.prototype.__defineGetter__("size", function () {
    return this._root ? this._root.weight : 0;
});

Tree.prototype.__defineGetter__("height", function () {
    return this._root ? this._root.height : 0;
});

Tree.prototype.getMin = function (node) {
    var smallest = node || this._root;
    while (smallest.left !== null) {
        smallest = smallest.left;
    }
    return smallest;
};

Tree.prototype.getMax = function (node) {
    var largest = node || this._root;
    while (largest.right !== null) {
        largest = largest.right;
    }
    return largest;
};

Tree.prototype.elementAt = function (ind) {

};

Tree.prototype.lookupNode = function (key) {
    var node = this._root;
    while (node !== null) {
        if (key < node.key) {
            node = node.left;
        } else if (key > node.key) {
            node = node.right;
        } else {
            return node;
        }
    }
    return undefined;
};

Tree.prototype.lookup = function (key) {
    var node = this.lookupNode(key);
    return node !== undefined ? node.value : undefined;
};

Tree.prototype._getValue = function (inserter, prev) {
    if (typeof inserter === 'function') {
        return inserter(prev);
    } else {
        return inserter;
    }
};

// value can either be a function - which is called with
// the existing value, or a value which is replaced.
Tree.prototype.insert = function (key, generator_or_value) {
    if (this._root === null) {
        this._root = new Node(key, this._getValue(generator_or_value));
        return this._root;
    }

    var ancestor = this._root;
    var new_node;
    while (true) {
        if (key < ancestor.key) {
            if (ancestor.left === null) {
                new_node = new Node(key, this._getValue(generator_or_value));
                ancestor.left = new_node;
                break;
            } else {
                ancestor = ancestor.left;
            }
        } else if (key > ancestor.key){
            if (ancestor.right === null) {
                new_node = new Node(key, this._getValue(generator_or_value));
                ancestor.right = new_node;
                break;
            }
            else {
                ancestor = ancestor.right;
            }
        } else {
            // found the key - already exists, let the user handle duplicate.
            // no need to balance as well.
            ancestor.value = this._getValue(generator_or_value, ancestor.value);
            return ancestor;
        }
    }
    new_node.parent = ancestor;
    // balancing ancestor to update its stats.
    this._balance(ancestor);
    return new_node;
};

Tree.prototype.remove = function (key) {
    return this.removeNode(this.lookupNode(key));
};

Tree.prototype.removeNode = function (node) {
    if (!node) {
        return false;
    }

    // Has max of one child.
    if (!node.left || !node.right) {
        this._simple_remove(node);
    } else {
        // will be a child of node; otherwise simple case.
        var successor = node.successor();
        this._simple_remove(successor);
        node.key = successor.key;
        node.value = successor.value;
    }
    return true;
};


Tree.prototype._simple_remove = function (node) {
    assert(!node.left || !node.right);
    var child = node.left || node.right;
    if (node === this._root) {
        this._root = child;
    } else if (node.isRightChild()) {
        assert(node.parent.right === node);
        node.parent.right = child;
    } else {
        assert(node.isLeftChild());
        node.parent.left = child;
    }

    if (child) {
        assert(child.isLeaf());
        child.parent = node.parent;
    }

    this._balance(node.parent);
    return true;
};

Tree.prototype._balance = function (node) {
    // simple_remove can call this with null.
    while (node !== null) {
        var balance_factor = node._balance_factor();
        var old_height = node.height;
        var rotated_node;
        if (balance_factor > 1) {
            if (node.left._balance_factor() < 0) {
                this._rotate_left(node.left);
            }
            rotated_node = node.left;
            this._rotate_right(node);
        } else if (balance_factor < -1) {
            if (node.right._balance_factor() > 0) {
                this._rotate_right(node.right);
            }
            rotated_node = node.right;
            this._rotate_left(node);
        } else {
            rotated_node = node;
            // update info anyways.
            node._update_info();
        }

        // rotated node is balanced; balance its parent.
        node = rotated_node.parent;

        if (old_height === rotated_node.height) {
            // no further changes required.
            // only weight needs to be updated
            while (node !== null) {
                node._update_info();
                node = node.parent;
            }
        }
    }
};

Tree.prototype._rotate_left = function (old_root) {
    var new_root = old_root.right;
    if (this._root === old_root) {
        this._root = new_root;
        new_root.parent = null;
    } else if (old_root.isLeftChild()) {
        old_root.parent.setLeftChild(new_root);
    } else {
        old_root.parent.setRightChild(new_root);
    }
    old_root.setRightChild(new_root.left);
    new_root.setLeftChild(old_root);
    // order here matters.
    old_root._update_info();
    new_root._update_info();
};

Tree.prototype._rotate_right = function (old_root) {
    var new_root = old_root.left;
    if (this._root === old_root) {
        this._root = new_root;
        new_root.parent = null;
    } else if (old_root.isLeftChild()) {
        old_root.parent.setLeftChild(new_root);
    } else {
        old_root.parent.setRightChild(new_root);
    }
    old_root.setLeftChild(new_root.right);
    new_root.setRightChild(old_root);
    // order here matters.
    old_root._update_info();
    new_root._update_info();
};
