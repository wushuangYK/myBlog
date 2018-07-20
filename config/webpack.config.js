/**
 * Created by wushuang on 2018/7/18.
 */
const merge = require('webpack-merge');//webpack配置文件合并
const baseConfig = require("./webpack.base.js");//基础配置

let config = {
    mode: 'production'
};

module.exports = merge(baseConfig, config);