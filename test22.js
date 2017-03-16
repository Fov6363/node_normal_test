/**
 * Created by yuanyuan on 17/1/23.
 */
const of_join = require('../lib/of_join');


let data = {
        "new_list2": [
            {
                "list2": {},
                "list1": {
                    "user_data": {
                        "items": [
                            "1",
                            "2",
                            "3"
                        ],
                        "user_desc": "",
                        "tags": [
                            "1111",
                            "2222",
                            "44"
                        ],
                        "user_name": "傻蛋",
                        "my_tags": "0",
                        "childs": [
                            "1",
                            "2",
                            "3",
                            "4"
                        ],
                        "f11": [
                            "1",
                            "2",
                            "3"
                        ],
                        "user_tags": {
                            "f11": [
                                "9",
                                "6",
                                "5"
                            ],
                            "f2": [
                                "4"
                            ]
                        },
                        "f3": [
                            "1",
                            "2",
                            "3"
                        ],
                        "f5": 0,
                        "profile_pic_url": "",
                        "f4": [
                            "1",
                            "2",
                            "3"
                        ]
                    },
                    "updated_at": 1485075412094,
                    "created_at": 1484311182304,
                    "id": 1078264660557825
                },
                "list3": {}
            },
            {
                "list3": {},
                "list2": {},
                "list1": {
                    "user_data": {
                        "my_tags": "0",
                        "tags": [
                            "5",
                            "2",
                            "1",
                            "3",
                            "4",
                            "6",
                            "7",
                            "8",
                            "9",
                            "12",
                            "11"
                        ],
                        "user_tags": [
                            "7892",
                            "2",
                            "3",
                            "4",
                            "123",
                            "1232"
                        ]
                    },
                    "updated_at": 1484728665915,
                    "created_at": 1484311307379,
                    "id": 1078266757709827
                }
            },
            {
                "list1": {
                    "id": 1078266875150340,
                    "created_at": 1484311314843,
                    "updated_at": 1484728665915,
                    "user_data": {
                        "my_tags": "0",
                        "tags": [
                            "5",
                            "2",
                            "1",
                            "3",
                            "4",
                            "6",
                            "7",
                            "8",
                            "9",
                            "12",
                            "11"
                        ],
                        "user_tags": [
                            "7892",
                            "2",
                            "3",
                            "4",
                            "123",
                            "1232"
                        ]
                    }
                },
                "list2": {},
                "list3": {}
            },
            {
                "list3": {},
                "list2": {},
                "list1": {
                    "updated_at": 1485331504022,
                    "user_data": {
                        "user_tags": [],
                        "tags": [
                            "5",
                            "2",
                            "1",
                            "3",
                            "4",
                            "6",
                            "7",
                            "8",
                            "9",
                            "12",
                            "11"
                        ],
                        "a": {},
                        "my_tags": "0",
                        "user_name": "用户名"
                    },
                    "id": 1080843603869697,
                    "created_at": 1484464899607
                }
            },
            {
                "list1": {
                    "created_at": 1484741608849,
                    "id": 1085486010531842,
                    "user_data": {},
                    "updated_at": 1484741608849
                },
                "list2": {},
                "list3": {}
            },
            {
                "list3": {},
                "list1": {
                    "user_data": {
                        "age": 23,
                        "name": "lili"
                    },
                    "updated_at": 1486107232448,
                    "created_at": 1486107232448,
                    "id": 1108397379354625
                },
                "list2": {}
            },
            {
                "list2": {},
                "list1": {
                    "created_at": 1486107685895,
                    "id": 1108404979433474,
                    "user_data": {
                        "name": "lili",
                        "age": 23
                    },
                    "updated_at": 1486107685895
                },
                "list3": {}
            }
        ]
};

let join_config = {
    params: [{key: 'limit', value: 10}, {key: 'page', value: 1}],
    sort_by: [{key: 'new_list2.list1.id', value: '-1'}],
    userParams: [{key: 'limit', value: '', type: 'int', required: false},
        {key: 'page', value: '', type: 'int', required: false}]
};


console.log(JSON.stringify(of_join.handle_join(data, join_config),true,2));