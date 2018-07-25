/**
 * Created by wushuang on 2018/7/23.
 */
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