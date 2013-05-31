exports.iterate = function (obj, fn) {
    if (obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
            fn(obj[i]);
        }
    }
};
