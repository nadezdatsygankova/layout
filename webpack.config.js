const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: 'source-map',
        watch: !isProduction,
        entry: './src/index.js',
        output: {
            filename: 'script.js',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }, {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader', 'css-loader', 'sass-loader',
                    ]
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
        ]
    }

    return config;
}