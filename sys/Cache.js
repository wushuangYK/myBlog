/**
 * Created by wushuang on 2018/8/14.
 */
import {json_decode} from '../util/cmnf'

const Cache = {
    //设置缓存
    set: (key, value) => {
        localStorage.setItem(key, value);
    },
    //获取缓存
    get: key => {
        return localStorage.getItem(key) ? localStorage.getItem(key) : false;
    },
    remove: key => {
        localStorage.removeItem(key);
    },
    //用户信息
    setUser: userInfo => {
        Cache.set("user", JSON.stringify(userInfo));
    },
    getUser: () => {
        let userInfo = Cache.get("user");
        return userInfo ? json_decode(userInfo) : false;
    },
    removeUser: () => {
        Cache.remove("user");
    },
    getUid: () => {
        let userInfo = Cache.getUser();
        return userInfo ? userInfo.uid : "";
    },
    getUsername: () => {
        let userInfo = Cache.getUser();
        return userInfo ? userInfo.username : "";
    }
};

export default Cache;