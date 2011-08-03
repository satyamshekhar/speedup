var exceptions_list = require('exceptions.list.js');

function Exception (name, code, message) {
    this.code = code;
    this.message = message;
    this.name = name;
    this.stack = 'Stack Trace';
}

Exception.prototype.toString = function () {
    return this.name + ' exception: ' + this.message;
};

var ex;
for (ex in exceptions_list) {
    exports[ex] = new Exception (ex, exception_list[ex].code, exceptions_list[ex].message);
}