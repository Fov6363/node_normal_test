/**
 * Created by yuanyuan on 17/6/1.
 */

const qiniu = require('./qiniu');





async function test() {
    const res = await upload('zhmd1277758660499661.mp4','/Users/yuanyuan/WebstormProjects/node_normal_test/zhihuimengdian_batch_upload/zhmd1277758660499661.mp4');

    console.log(res);
}
//http://ofdx4t772.bkt.clouddn.com/zhmd1277758660499661.mp4


function upload(key,localFile) {
    return new Promise(function (resolve,reject) {
        qiniu.uploadFile(key,localFile,function (err,result) {
            if(err){
                console.log(err);
                console.log(`key = ` + key);
                console.log(`localFile = ` + localFile);
            }else{
                resolve(result);
            }
        });
    });
}



test();