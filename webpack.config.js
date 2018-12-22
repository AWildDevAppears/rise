const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      'rise': ['./src/app.js'],
    },
    mode: 'production',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Rise',
        }),
    ]
};
