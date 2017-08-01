const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: {
        'vendor': ['react'],
        'bundle': [
            './src/index'
        ],
        'bundleLoading': [
            './src/loading'
        ],
        'bundleParFor': [
            './src/payfor'
        ],
        'bundleCoupon': [
            './src/coupon'
        ],
        'bundleCouponList': [
            './src/couponList'
        ],
        'bundleAuthent': [
            './src/authent'
        ],
        'bundlePledge': [
            './src/pledge'
        ],
        'bundleRecharge': [
            './src/recharge'
        ],
        'bundleTrip': [
            './src/trip'
        ],
        'bundleUser': [
            './src/user'
        ],
        'bundleWallet': [
            './src/wallet'
        ],
        'bundleUnlockUsing': [
            './src/unlockUsing'
        ],
        'bundleMechanicalUsing': [
            './src/mechanicalUsing'
        ]


    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.json', '.less']
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'react-hot-loader'
            }, {
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['transform-runtime']
                }
            }]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        }]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),

    ]
};