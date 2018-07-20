/**
 * Created by wushuang on 2018/7/18.
 */
const path = require("path");
const merge = require('webpack-merge');//webpack配置文件合并
const baseConfig = require("./webpack.base.js");//基础配置

let config = {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, '../'),
        host: 'localhost',
        compress: true,
        port: 8888
    }
};

module.exports = merge(baseConfig, config);