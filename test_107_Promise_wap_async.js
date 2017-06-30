/**
 * Created by yuanyuan on 17/3/19.
 */
const Promise = require('bluebird');
const Event   = require('events');

class Test extends Event{
    constructor(){
        super();
    }

    exec(){
        return new Promise((resolve,reject) => {
            this.on('data',async function (msg) {
                msg = await this.handle_msg(msg);
                return resolve(msg);
            })
        });
    }

    async handle_msg(msg){
        return msg + ' async';
    }
}

const test = new Test();


test.exec().then(res => console.log(res));

test.emit('data','adsfadf');