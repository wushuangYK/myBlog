/**
 * Created by wushuang on 2018/2/8.
 */
import {message} from 'antd';
import {rootURL} from '../config/server.config';
const fetch = require('isomorphic-fetch');

export const Post = (url, parameters) => {
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
                message.error('请求错误!');
                throw 'post error';
            } else {
                return response.json();
            }
        }
    ).then(
        json => {
            if (json.Error == "1")
                throw json.Data;
            else
                return json.Data;
        }
    );
};

export const URL = {
    //member
    MEMBER_GETALL: "member/getAll",
    MEMBER_ADD: "member/add",
    //task
    TASK_GETALL: "task/getAll",
    TASK_ADD: "task/add",
    TASK_UPDATE: "task/update",
    TASK_DEL: "task/del"
};