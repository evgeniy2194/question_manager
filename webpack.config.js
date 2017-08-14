'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ['./src/main.js', './src/css/style.css'],
    output: {
        path: path.join(__dirname, '/static/js/'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].min.css")
    ]
};