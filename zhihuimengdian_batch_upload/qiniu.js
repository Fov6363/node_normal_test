/**
 * Created by yuanyuan on 16/10/21.
 */
const qiniu   = require('qiniu');


const thumbnail_pic_suffix  = '?imageView2/1/w/300/h/300';
const bmiddle_pic_suffix    = '?imageView2/1/w/600/h/600';
const captcha_image_suffix  = '?imageView2/1/w/180/h/180';
const original_pic          = '?imageView2';
const download_file_suffix  = '?attname=';

//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
}


function uploadFile(key,localFile,cb) {
    //需要填写你的 Access Key 和 Secret Key
    qiniu.conf.ACCESS_KEY = 'oF2pOKfy-q2Jo_K5ONxiv34EkPzkl4Ba5_DADLtK';
    qiniu.conf.SECRET_KEY = 'dOvuihJVvP0d6p9Hka-VN865-zcCx7THZd6eZpFh';
    //要上传的空间
    const bucket = 'baas';
    //baas bucket的url前缀
    const url_pre = 'http://ofdx4t772.bkt.clouddn.com/';


    if(typeof key != 'string'){
        key += '';
    }

    let token = uptoken(bucket,key);

    let extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token,key,localFile,extra,function (err,ret) {
        cb(err,url_pre + key);
    });

}


module.exports.uploadFile           = uploadFile;
module.exports.thumbnail_pic_suffix = thumbnail_pic_suffix;
module.exports.bmiddle_pic_suffix   = bmiddle_pic_suffix;
module.exports.captcha_image_suffix = captcha_image_suffix;
module.exports.original_pic_suffix  = original_pic;
module.exports.download_file_suffix = download_file_suffix;
