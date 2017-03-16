let body = {
    'schema_type' : 'user',
    'title_key': [{"title":"用户id","key":"id","default":""},{"title":"用户姓名","key":"user_data.user_name"},{"title":"创建的直播","key":"counter_data.data_live_count","default":"4","convert":{"type":"translate","format":{"1":"一个","2":"两个","3":"三个","4":"没有"}}},{"title":"创建时间","key":"created_at","convert":{"type":"date","format":"YYYY-MM-DD HH:mm:ss"}}],
    'filename': '用户列表.xlsx',
    'age':{'1':'2'}
};






//
// let keys = Object.keys(body);
// for(let key of keys){
//     if(Array.isArray(body[key])){
//         if(isJson(body[key])){
//             for(let i of body[key]){
//                 body[key][i] = JSON.stringify(body[key][i]);
//             }
//         }
//         body[key] = JSON.stringify(body[key]);
//     }else if(isJson(body[key])){
//         body[key] = JSON.stringify(body[key]);
//     }
// }
//



console.log(JSON.stringify(body['title_key']));

