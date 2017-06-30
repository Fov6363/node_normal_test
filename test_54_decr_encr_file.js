/**
 * Created by yuanyuan on 17/3/19.
 */
const debug                 = require('debug')('success');
const debug_fail            = require('debug')('fail');
const Promise               = require('bluebird');
const CryptoJs              = require('crypto-js');
const crypto                = require('crypto');
const fs                    = require('fs');
const normalUtil            = require('normalutil');

const secret_key            = '8d26c846ca909ce72db342a12f2c3fd5';
const dir_path              = 'extends/';
const new_dir_path          = 'extends_copy/';
const decr_key              = md5(secret_key);


function md5(key) {
    if(typeof key != 'string'){
        key += '';
    }

    if(key){
        key  = crypto.createHash('md5').update(key).digest("hex");
    }
    return key;
}

let j = 0;

function decr_file() {
    let files = fs.readdirSync(dir_path);
    if(!fs.existsSync(new_dir_path)){
        fs.mkdirSync(new_dir_path);
    }

    files.forEach(function (file) {
        if(file.indexOf('.json') > -1){
            let file_path = dir_path + file;
            let new_file_path = new_dir_path + file;

            fs.readFile(file_path,'UTF-8',function (err,doc) {
                if(err){
                    debug_fail('readFile error, file_name = ' + file_path);
                }

                try{

                    if(normalUtil.isJson(doc)){
                        j++;
                        debug(`file is json file, j = ${j}`);
                        return;
                    }

                    let bytes = CryptoJs.AES.decrypt(doc.toString(),decr_key);
                    var configValue = bytes.toString(CryptoJs.enc.Utf8);

                    fs.writeFile(new_file_path, configValue, function (err) {
                        if (err) {
                            debug_fail('writeFile error, file_name = ' + new_file_path);
                        }else{
                            j++;
                            debug('success ! j = ' + j);
                        }
                    });
                }catch (e){
                    //解密失败
                    j++;
                    debug('file decr fial, j = ' + j);
                }
            });
        }
    });

}


decr_file();