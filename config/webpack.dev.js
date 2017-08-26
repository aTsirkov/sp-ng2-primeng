var helpers = require('./helpers');
var commonConfig = require('./webpack.common.js');

var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');



module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        publicPath: '',
        path: helpers.root('./dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
