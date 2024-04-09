var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isPrd = process.env.NODE_ENV === 'production' ? true : false;
console.log(isPrd);

module.exports = {
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        client: {
            overlay: false
        },
        port: 9000,
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' },
            },
        ],
    },
    devtool: isPrd ? 'hidden-source-map' : 'source-map',    //对treesharking会有影响
    mode: isPrd ? 'production' : 'development',
    entry: {
        index: "./index.js",
    },
    output: {
        filename: "[name].bundle.[hash:5].js",
        publicPath: "/",
        path: path.resolve(__dirname, "dist")
    },
    // cache: {
    //     type: 'filesystem'  //是否启用缓存，启用后，首次编译会变慢，后续编译会变快
    // },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
            ]
        }, {
            test: /\.less$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
                { loader: "less-loader" },
            ]
        }, {
            test: /\.scss$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
                { loader: "sass-loader" },
            ]
        }, {
            test: /(\.js|\.jsx|\.ts|\.tsx)$/,
            use: [
                // 开启多进程打包,项目大的时候可以打开，小的话可以不打开
                // {
                //     loader: "thread-loader", 
                //     options: {
                //         workers: 3, // 进程3个
                //     },
                // },
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            ['@babel/preset-react', { runtime: 'automatic' }]

                        ],
                    }
                }
            ],
            exclude: /node_modules/
        }]
    },
    resolve: {
        //别名处理
        alias: {
            "@": path.resolve(__dirname, 'src'),  //必须时绝对路径
        },
        //扩展名处理
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            //chunks: ['index']  //配置多入口需要
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/assets', to: 'assets' },
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
}

