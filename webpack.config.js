let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/public/'
    },
    mode: 'production',
    devtool: true,
    watch: true,
    watchOptions: {
        aggregateTimeout: 100,
        ignored: /node_modules/,
        poll: 2000
    },
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/chen': ''
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'eslint-loader',
                        options: { fix: true }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin()
    ]
}