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
                test: /\.(png|jpg|gif|eot|ttf|woff|svg)$/,
                loader: 'url-loader?limit=50000'
            },
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.css$/,
                use: [{loader: "style-loader"},{loader: "css-loader"}]
            },
            {
                test: /\.less/,
                use: [{loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: 'less-loader', options: { javascriptEnabled: true }}]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [["env"],["react"]],
                    plugins: [
                        "transform-class-properties",
                        ["import", { libraryName: "antd", style: true }] // `style: true` 会加载 less 文件
                    ]
                }
            }
        ]
    },
    plugins: []
};