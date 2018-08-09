/**
 * Created by wushuang on 2018/7/23.
 */
import React from 'react'
import {Tree} from 'antd'

const TreeNode = Tree.TreeNode;

export function isEmpty(o){
    if(o === null || o === undefined)
        return true;
    switch (typeof o){
        case "boolean":
            return false;
        case "object":
            for (let t in o)
                return false;
            return true;
        case "array":
        case "string":
            return o.length <= 0;
        case "number":
            return o.toString().length <= 0;
        case "function":
            return false;
    }
    return true;
}

export function keyCount(arr, key, val){
    if(isEmpty(arr))
        return 0;
    let count = 0;
    for(let i in arr){
        if(!isEmpty(arr[i][key]) && arr[i][key] === val)
            count++;
    }
    return count;
}

/**包含ReactNode的通用函数**/
export const generateTreeNode = (list, titleKey = "title", key="id") => {
    let ret = [];
    list.map(item =>{
        if(isEmpty(item.children)){
            ret.push(<TreeNode title={item[titleKey]} key={item[key]}/>)
        } else {
            ret.push(
                <TreeNode title={item[titleKey]} key={item[key]}>
                    {generateTreeNode(item.children)}
                </TreeNode>
            )
        }
    });
    return ret;
};

export const json_decode = (string, default_ret = "") => {
    try{
        return JSON.parse(string);
    }  catch (e){
        return default_ret;
    }
};