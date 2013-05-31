function A () {
    var x = [];
    this.push = function (a) {x.push(a);};
}


function B() {
    this.x = [];
    // this.push = function (a) {
    //     this.x.push(a);
    // };
}

B.prototype.push = function (a) {
     this.x.push(a);
};

var a = [];
var b = [];
for (var i = 0; i < 10000000; i++) a.push(i);

var t = new Date();
for (var i = 10000000; i >= 0; i--) b.push(i);
console.log(new Date() - t);

var tt = new Date();
a.reverse();
console.log(new Date() - tt);

/*
var x = 1;
var A = [];

var now = new Date();
for (var i = 0; i < 10000000; i++) {
    A.push(x++);
}
console.log("setup: " + (new Date() - now));

var d = 0;
now = new Date();
for (var i = 0; i < 10000000; i++) {
    d++;
}
console.log("for: " + (new Date() - now));

var c = 0;
F = function (o) {c++;};
now = new Date();
A.forEach(F);
console.log("foreach: " + (new Date() - now));

d = 0;
G = function (o) {d++;};
now = new Date();
for (var i = 0; i < 10000000; i++) {
    G(A[i]);
}
console.log("func call: " + (new Date() - now));
*/

/*
x = 1;
A = [];
now = new Date();
for (var i = 0; i < 10000000; i++) {
    A[A.length] = x++;
}
console.log(new Date() - now);
*/
/*
x = 1;
A = [];
now = new Date();
for (var i = 0; i < 10000000; i++) {
    A[i] = x++;
}
console.log(new Date() - now);
*/
