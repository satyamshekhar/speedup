var ARR_LEN = 1000000;
var READS = 1000000;

var time = new Date();
var x = [];
x[0] = 19;
for (var i = 1; i <= ARR_LEN; i++)
    x[i] = ((x[i - 1] * 23) + 53) % 22695477;

var time2 = new Date();

var reads = [];
reads[0] = 23;
for (i = 1; i < READS; i++)
    reads[i] = (((reads[i - 1] * 17) + 37) % 1664525) % 100000;

var time3 = new Date();

var a;
for (i = 0; i < READS; i++) {
    ++x[reads[i]];
}
console.log(time2 - time);
console.log(time3 - time2)
console.log(new Date() - time3);
