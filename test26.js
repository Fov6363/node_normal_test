
const debug = require('debug')('test26:a');

let obj = {
    'abc':23
};


function hello() {

    this.abc = 123;
    this.con = function () {
        debug(this.abc);
        return 11111111;
    };
    debug(this.abc);
}

hello.bind(obj)();
// debug(hello.bind(obj));
// debug(hello);
// debug(obj);

// debug( new obj.efg('bbbbbbbbbb').con());

