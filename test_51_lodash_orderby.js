/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('lodash');
const lodash = require('lodash');
const Promise = require('bluebird');

let arr = [{"title_values":["广西省","大学"],"group_values":[{"show_values":["订单的最大值",9996,9458,0,9598],"params":{"event":"order","cal_function":"max","field_key":"income","field_type":"order"}},{"show_values":["订单的总和",172820,59537,0,49878],"params":{"event":"order","cal_function":"sum","field_key":"paymentAmount","field_type":"order"}},{"show_values":["订单的均值",51.49645390070922,54.020833333333336,0,45.1025641025641],"params":{"event":"order","cal_function":"avg","field_key":"age","field_type":"order"}},{"show_values":["订单的总次数",141,48,0,39],"params":{"event":"order","cal_function":"count","field_key":"sign_in","field_type":"payorder"}}]},{"title_values":["青海省","初中"],"group_values":[{"show_values":["订单的最大值",9988,9988,0,9271],"params":{"event":"order","cal_function":"max","field_key":"income","field_type":"order"}},{"show_values":["订单的总和",324326,144082,0,72137],"params":{"event":"order","cal_function":"sum","field_key":"paymentAmount","field_type":"order"}},{"show_values":["订单的均值",51.06349206349206,50.6605504587156,0,46.644067796610166],"params":{"event":"order","cal_function":"avg","field_key":"age","field_type":"order"}},{"show_values":["订单的总次数",252,109,0,59],"params":{"event":"order","cal_function":"count","field_key":"sign_in","field_type":"payorder"}}]},{"title_values":["河南省","初中"],"group_values":[{"show_values":["订单的最大值",9910,9895,9910,9793],"params":{"event":"order","cal_function":"max","field_key":"income","field_type":"order"}},{"show_values":["订单的总和",324473,143538,112233,68702],"params":{"event":"order","cal_function":"sum","field_key":"paymentAmount","field_type":"order"}},{"show_values":["订单的均值",49.38671875,49.15596330275229,48.45161290322581,51.46296296296296],"params":{"event":"order","cal_function":"avg","field_key":"age","field_type":"order"}},{"show_values":["订单的总次数",256,109,93,54],"params":{"event":"order","cal_function":"count","field_key":"sign_in","field_type":"payorder"}}]},{"title_values":["天津市","初中"],"group_values":[{"show_values":["订单的最大值",9969,9948,9845,0],"params":{"event":"order","cal_function":"max","field_key":"income","field_type":"order"}},{"show_values":["订单的总和",303898,120566,105362,0],"params":{"event":"order","cal_function":"sum","field_key":"paymentAmount","field_type":"order"}},{"show_values":["订单的均值",49.37190082644628,48.16483516483517,49.977777777777774,0],"params":{"event":"order","cal_function":"avg","field_key":"age","field_type":"order"}},{"show_values":["订单的总次数",242,91,90,0],"params":{"event":"order","cal_function":"count","field_key":"sign_in","field_type":"payorder"}}]},{"title_values":["云南省","小学"],"group_values":[{"show_values":["订单的最大值",9920,9421,0,9480],"params":{"event":"order","cal_function":"max","field_key":"income","field_type":"order"}},{"show_values":["订单的总和",146233,46585,0,48483],"params":{"event":"order","cal_function":"sum","field_key":"paymentAmount","field_type":"order"}},{"show_values":["订单的均值",48.06611570247934,47,0,49.22222222222222],"params":{"event":"order","cal_function":"avg","field_key":"age","field_type":"order"}},{"show_values":["订单的总次数",121,42,0,36],"params":{"event":"order","cal_function":"count","field_key":"sign_in","field_type":"payorder"}}]},{"title_values":["河北省","高中"],"group_values":[{"show_values":["订单的最大值",9959,9825,9959,9952],"params":{"event":"order","cal_function":"max","field_key":"income","field_type":"order"}},{"show_values":["订单的总和",336312,139933,116022,80357],"params":{"event":"order","cal_function":"sum","field_key":"paymentAmount","field_type":"order"}},{"show_values":["订单的均值",52.58888888888889,49.228070175438596,56.7,52.78787878787879],"params":{"event":"order","cal_function":"avg","field_key":"age","field_type":"order"}},{"show_values":["订单的总次数",270,114,90,66],"params":{"event":"order","cal_function":"count","field_key":"sign_in","field_type":"payorder"}}]},{"title_values":["上海市","高中"],"group_values":[{"show_values":["订单的最大值",9966,9966,9896,0],"params":{"event":"order","cal_function":"max","field_key":"income","field_type":"order"}},{"show_values":["订单的总和",297747,107015,111167,0],"params":{"event":"order","cal_function":"sum","field_key":"paymentAmount","field_type":"order"}},{"show_values":["订单的均值",51.49387755102041,50.52272727272727,52.236559139784944,0],"params":{"event":"order","cal_function":"avg","field_key":"age","field_type":"order"}},{"show_values":["订单的总次数",245,88,93,0],"params":{"event":"order","cal_function":"count","field_key":"sign_in","field_type":"payorder"}}]},{"title_values":["四川省","初中"],"group_values":[{"show_values":["订单的最大值",9957,9830,0,9689],"params":{"event":"order","cal_function":"max","field_key":"income","field_type":"order"}},{"show_values":["订单的总和",319140,130231,0,73693],"params":{"event":"order","cal_function":"sum","field_key":"paymentAmount","field_type":"order"}},{"show_values":["订单的均值",50.479838709677416,52.71568627450981,0,51.44642857142857],"params":{"event":"order","cal_function":"avg","field_key":"age","field_type":"order"}},{"show_values":["订单的总次数",248,102,0,56],"params":{"event":"order","cal_function":"count","field_key":"sign_in","field_type":"payorder"}}]},{"title_values":["云南省","初中"],"group_values":[{"show_values":["订单的最大值",9993,9969,0,9849],"params":{"event":"order","cal_function":"max","field_key":"income","field_type":"order"}},{"show_values":["订单的总和",358395,130418,0,95740],"params":{"event":"order","cal_function":"sum","field_key":"paymentAmount","field_type":"order"}},{"show_values":["订单的均值",48.77454545454545,47.794117647058826,0,53.67123287671233],"params":{"event":"order","cal_function":"avg","field_key":"age","field_type":"order"}},{"show_values":["订单的总次数",275,102,0,73],"params":{"event":"order","cal_function":"count","field_key":"sign_in","field_type":"payorder"}}]},{"title_values":["湖北省","高中"],"group_values":[{"show_values":["订单的最大值",9957,9898,9957,9627],"params":{"event":"order","cal_function":"max","field_key":"income","field_type":"order"}},{"show_values":["订单的总和",260203,103002,92512,64689],"params":{"event":"order","cal_function":"sum","field_key":"paymentAmount","field_type":"order"}},{"show_values":["订单的均值",50.71153846153846,54.31325301204819,49.21052631578947,46.93877551020408],"params":{"event":"order","cal_function":"avg","field_key":"age","field_type":"order"}},{"show_values":["订单的总次数",208,83,76,49],"params":{"event":"order","cal_function":"count","field_key":"sign_in","field_type":"payorder"}}]}];






lodash.orderBy(arr,['group_values[0].show_values[1]'],['desc']);

debug(JSON.stringify(arr));