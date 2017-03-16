/**
 * Created by yuanyuan on 16/12/30.
 */
/**
 * Created by yuanyuan on 16/10/21.
 */
const qiniu   = require('qiniu');
const config = {
    'access_key': 'oF2pOKfy-q2Jo_K5ONxiv34EkPzkl4Ba5_DADLtK',
    'secret_key': 'dOvuihJVvP0d6p9Hka-VN865-zcCx7THZd6eZpFh',
    'bucket'    : 'baas',
};

//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
};


function uploadFile(key,localFile,cb) {
    //需要填写你的 Access Key 和 Secret Key
    qiniu.conf.ACCESS_KEY = config['access_key'];
    qiniu.conf.SECRET_KEY = config['secret_key'];
    //要上传的空间
    const bucket = config['bucket'];


    if(typeof key != 'string'){
        key += '';
    }

    let token = uptoken(bucket,key);

    let extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token,key,localFile,extra,function (err,ret) {
        cb(err, ret);
    });

}


uploadFile('111111111111','/Users/yuanyuan/Documents/shell_photo/shell_3.jpg',function (err,result) {
    console.log(err);
    console.log(result);
});