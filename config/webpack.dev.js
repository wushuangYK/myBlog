/**
 * Created by wushuang on 2018/7/18.
 */
const path = require("path");
const merge = require('webpack-merge');//webpack配置文件合并
const baseConfig = require("./webpack.base.js");//基础配置

let config = {
    mode: 'development',
    devServer: {
        publicPath: '/dist/',
        host: 'localhost',
        port: 8888,
        historyApiFallback: {
            index: 'index.html'
        }
    }
};

module.exports = merge(baseConfig, config);