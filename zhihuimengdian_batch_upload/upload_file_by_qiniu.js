/**
 * Created by yuanyuan on 17/5/31.
 */
const qiniu     = require('./qiniu');
const fs        = require('fs');
const Promise   = require('bluebird');




const files = fs.readdirSync('./');
let path = '/Users/yuanyuan/WebstormProjects/node_normal_test/zhihuimengdian_batch_upload/';
let path_array = [];
let id = 0;
const residue_arr = [ 'zhmd1272560760229921.mp4',
    'zhmd1272561649422502.mp4',
    'zhmd1272563729797582.mp4',
    'zhmd1272564350554727.mp4',
    'zhmd1272565004866189.mp4',
    'zhmd1272567739552803.mp4',
    'zhmd1272570004477299.mp4',
    'zhmd1272570893669898.mp4',
    'zhmd1272572588168981.mp4',
    'zhmd1272573276034876.mp4',
    'zhmd1272574148450254.mp4',
    'zhmd1277717271103021.mp4',
    'zhmd1277725978478995.mp4',
    'zhmd1277728394398408.mp4',
    'zhmd1277731582069762.mp4',
    'zhmd1277747033887505.mp4',
    'zhmd1277748359287688.mp4',
    'zhmd1277750137672820.flv',
    'zhmd1277752469706092.mp4',
    'zhmd1277753107240413.mp4',
    'zhmd1277754382308985.mp4',
    'zhmd1277754868848363.mp4',
    'zhmd1277755858704230.mp4',
    'zhmd1277755942590313.mp4',
    'zhmd1277757234436067.mp4',
    'zhmd1277758660499661.mp4',
    'zhmd1277758912157906.mp4',
    'zhmd1277760254335314.mp4',
    'zhmd1277761294522822.mp4',
    'zhmd1277762418596420.mp4',
    'zhmd1277763576224499.flv',
    'zhmd1277764431862679.mp4',
    'zhmd1277766378019969.mp4',
    'zhmd1277766780673270.mp4',
    'zhmd1277767401430270.mp4',
    'zhmd1277768173182328.mp4',
    'zhmd1277768458395005.mp4',
    'zhmd1277769465028092.mp4',
    'zhmd1277769750240891.mp4',
    'zhmd1277770656210614.mp4',
    'zhmd1277770891091713.mp4',
    'zhmd1277772199714678.mp4',
    'zhmd1277772719808494.mp4',
    'zhmd1277773256679416.mp4',
    'zhmd1277775370608882.mp4',
    'zhmd1277819914123056.mp4',
    'zhmd1277849492358067.mp4',
    'zhmd1277850868089925.mp4',
    'zhmd1277867762748182.mp4',
    'zhmd1277887777968886.mp4',
    'zhmd1277890462323749.mp4',
    'zhmd1277891032749098.mp4',
    'zhmd1277891603174543.mp4',
    'zhmd1277902374148308.mp4',
    'zhmd1277903280118090.mp4',
    'zhmd1277904118979002.mp4',
    'zhmd1277904840399398.mp4',
    'zhmd1277906182576789.mp4',
    'zhmd1277907323427600.mp4',
    'zhmd1277908111956860.mp4',
    'zhmd1277908934040567.mp4',
    'zhmd1277910829866192.mp4',
    'zhmd1277911333182678.mp4',
    'zhmd1277912373370198.mp4',
    'zhmd1277913765879337.mp4',
    'zhmd1277915426823825.mp4',
    'zhmd1277916450234105.mp4',
    'zhmd1277917154877281.mp4',
    'zhmd1277918010515402.mp4',
    'zhmd1277920610984179.mp4',
    'zhmd1277921550508304.mp4',
    'zhmd1277923177898496.mp4',
    'zhmd1277924570407473.mp4',
    'zhmd1277929653904564.mp4',
    'zhmd1277932573140487.mp4',
    'zhmd1277953192341255.mp4',
    'zhmd1277992484585360.mp4',
    'zhmd1277992904015765.mp4' ];



files.forEach(item => {
    if(item.includes('.mp4') || item.includes('.flv')){
        path_array.push({
            'name': item,
            'path': path + item
        });
    }
});


async function run_task_one() {
    while (path_array.length > 0){
        const item = path_array.pop();
        const name = item['name'];
        const path = item['path'];

        if(residue_arr.includes(name)){
            try{
                const result = await upload(name,path);
                fs.appendFileSync('./res.txt',result + ',');

            }catch (e){
                console.log(`name = ${name},e = ${e.message}`);
            }
        }
    }
}




function upload(key,localFile) {
    return new Promise(function (resolve,reject) {
        qiniu.uploadFile(key,localFile,function (err,result) {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}

run_task_one();












