const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry : ['babel-polyfill','./first/app.js'],
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename : 'js/bundle.js'
    },
    devServer: { 
        contentBase : './dist'
    },  
    plugins : [
        new htmlWebpackPlugin({
            filename : 'index.html',
            template : './first/index.html' 
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};