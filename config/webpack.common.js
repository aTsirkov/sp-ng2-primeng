var helpers = require('./helpers');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SPSaveWebpackPlugin = require('spsave-webpack-plugin');

module.exports = {
    entry: {
        'main': ['whatwg-fetch', './src/main.browser.ts'],  //'es6-promise', 
        'polyfills': './src/polyfills.browser.ts'
        },

    resolve: {
        extensions: ['*', '.ts', '.js'],
        modules: [helpers.root('node_modules')]
    },

    resolveLoader: {
        modules: [helpers.root('node_modules')]
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },

    node: {
        global: true,
        crypto: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: true,
        clearImmediate: false,
        setImmediate: false
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
            },
            {
                test: /\.html$/,
                exclude: helpers.root('src', 'index.html'),
                loader: 'raw-loader',
                options: {
                    minimize: false,    //true
                    removeComments: true,
                    collapseWhitespace: true,

                    // angular 2 templates break if these are omitted
                    removeAttributeQuotes: false,
                    keepClosingSlash: true,
                    caseSensitive: true,
                    conservativeCollapse: true,
                }
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                exclude: helpers.root('src', 'assets'),
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: helpers.root('src', 'assets'),
                loader: "url-loader?name=assets/[name].[ext]&limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: helpers.root('src', 'assets'),
                loader: "file-loader?name=assets/[name].[ext]"
            },
            {
                test: /\.json$/,
                include: helpers.root('src', 'assets'),
                loader: 'json-loader?name=assets/[path][name].[ext]&context=./src/static'
            },
            {
                test: /^.*/,
                include: helpers.root('src', 'assets'),
                loader: 'file-loader?name=assets/[path][name].[ext]&context=./src/static'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract({ use: 'css-loader?sourceMap', fallback: 'style-loader' })
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            }
   ]},

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'polyfills']
        }),
        /*new CopyWebpackPlugin([{
            from: 'src/static', to: 'static'
        }]),*/
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.ProvidePlugin({
            //Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('../src'), { }
        ),
        new SPSaveWebpackPlugin({
            "coreOptions": {
                "checkin": true,
                "checkinType": 1,
                "siteUrl": "https://s001cl-spswfe01/Hermione/0706/"//"http://s502as-its-sp01/sites/RTMonitor/"   // "http://win-fhs38e94km0/sites/Develop"
            },
            "credentialOptions": {
                username: 'tsirkovaa',
                password: 'qwe12345678-=',
                domain: 'sibur'
                //username: 'Администратор',
                //password: 'aTsirkov3005',
                //domain: 'win-fhs38e94km0'
            },
            "fileOptions": {
                "folder": "SiteAssets/GermionaT"
            }
        })
    ]
};
