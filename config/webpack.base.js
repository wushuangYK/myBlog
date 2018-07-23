/**
 * Created by wushuang on 2018/7/20.
 */
const path = require("path");

module.exports = {
    //入口文件
    entry: {
        main: './src/index.js'
    },
    //出口文件
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [["env"],["react"]],
                    plugins: [
                        "transform-class-properties"
                    ]
                }
            }
        ]
    },
    plugins: []
};