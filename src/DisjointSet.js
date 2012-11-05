var DisjointSets = module.exports.DisjointSets = function () {
    this._sets = {};
    this._key = 1;
};

DisjointSets.prototype.makeSet = function (x) {
    var set = new Set(x);
    set._key = this._key;
    this._sets[this._key] = set;
    ++this._key;
    return set;
};

DisjointSets.prototype.deleteSet = function (x) {
    if (Object.hasOwnProperty(this._sets, x._key)) {
        delete this._sets[x._key];
        return true;
    }
    return false;
};

DisjointSets.prototype.countSets = function () {
    return Object.keys(this._uniqueSets).length;
};

DisjointSets.prototype.mergeSets = function (set1, set2) {
    var union = set1.union(set2);
    if (set1 === union) delete this._sets[set2._key];
    else delete this._sets[set2._key];
};

DisjointSets.prototype.union = this.mergeSets;

var Set = exports.DisjointSet = function (data) {
    this.data = data;

    this._rank = 0;
    this._leader = this;
    this._followers = [this];
};

Set.prototype.union = function (other) {
    var myLeader = this.find();
    var otherLeader = other.find();

    // same set - return either.
    if (myLeader === otherLeader) {
        return other;
    }

    if (myLeader._rank < otherLeader._rank) {
        myLeader._leader = otherLeader;
        otherLeader._followers.push(myLeader._followers);
        myLeader._followers = [];
        return otherLeader;
    }

    otherLeader._leader = myLeader;
    myLeader._followers.push(otherLeader._followers);

    if (myLeader._rank === otherLeader._rank){
        ++myLeader._rank;
    }

    return myLeader;
};

Set.prototype.members = function () {
    var leader = this.find();
    leader._followers = flatten(leader._followers);
    return leader._followers.slice();
};

Set.prototype.find = function () {
    if (this._leader != this) {
        this._leader = this._leader.find();
    }
    return this._leader;
};

var flatten = function (arr, acc) {
    for (var i = 0, l = arr.length; i < l; i++) {
        if (Array.isArray(arr[i])) {
            flatten(arr[i], acc);
        } else {
            acc.push(arr[i]);
        }
    }
    return arr;
};
