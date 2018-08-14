/**
 * Created by wushuang on 2018/2/8.
 */
import {rootURL} from '../config/server.config';
import Cache from '../sys/Cache'
const fetch = require('isomorphic-fetch');

export const Post = (url, parameters) => {
    parameters = parameters || {};
    //生成http请求
    url = String(url);
    let newOptions = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post'
    };
    let form = '';
    for (let key in parameters) {
        let value = parameters[key];
        if (typeof value === 'object' || Array.isArray(value)) {
            value = JSON.stringify(value);
        }
        let item = key + '=' + encodeURIComponent(value);
        form = form.length === 0 ? form + item : form + '&' + item;
    }
    newOptions.body = form;
    return fetch(rootURL + url, newOptions).then(
        response => {
            if (response.status !== 200) {
                throw 'post error';
            } else {
                return response.json();
            }
        }
    ).then(
        json => {
            if (json.Error === 1)
                throw json.Data;
            else
                return json.Data;
        }
    );
};

export const PostUid = (url, parameters) => {
    parameters = parameters || {};
    parameters.uid = Cache.getUid();
    return Post(url, parameters);
};

export const URL = {
    //user
    USER_LOGIN: "user/login",
    USER_SIGNUP: "user/signup",
    //diary
    DIARY_GET: "diary/get",
    DIARY_SAVE: "diary/save",
    //dailyTask
    DAILYTASK_GET: "dailyTask/get",
    DAILYTASK_SAVE: "dailyTask/save",
    //blogType
    BLOGTYPE_GETALL: "blogType/getAll",
    BLOGTYPE_ADD: "blogType/add",
    BLOGTYPE_DEL: "blogType/del",
    //blog
    BLOG_ADD: "blog/add",
    BLOG_GETBYTYPE: "blog/getByType",
    //member
    MEMBER_GETALL: "member/getAll",
    MEMBER_ADD: "member/add",
    //task
    TASK_GETALL: "task/getAll",
    TASK_ADD: "task/add",
    TASK_UPDATE: "task/update",
    TASK_DEL: "task/del"
};