const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',

    entry: path.resolve(__dirname, 'src', 'index.js'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        alias: {
            Component: path.resolve(__dirname, 'src/component/')
        }
    },
    
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            // {
            //     test: /\.ico$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[ext]',
            //     }
            // },
            // {
            //     test: /\.(png|jpg|jpeg|svg|gif)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[ext]',
            //         outputPath: 'images',
            //         publicPath: './images'
            //     }
            // },
            // {
            //     test: /\.(woff|woff2|ttf|eot|otf)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[ext]',
            //         outputPath: 'fonts',
            //         publicPath: './fonts'
            //     }
            // },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
                //loader: 'style-loader!css-loader'
            }
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/*.html",
                    to: "[name][ext]"
                },
            ]
        })
    ],

    // devServer: {
    //     port: 3000,
    //     static: path.resolve(__dirname, 'src')
    // }

}