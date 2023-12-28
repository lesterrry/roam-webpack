const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/script.js'),
    output:
    {
        hashFunction: 'xxhash64',
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
        [
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(__dirname, '../static') }
                ]
            }),
            new HtmlWebpackPlugin({
                template: '!!haml-loader!./src/index.haml',
                filename: 'index.html',
                minify: true
            }),
            new HtmlWebpackPlugin({
                template: '!!haml-loader!./src/pages/preview/index.haml',
                filename: 'preview/index.html',
                minify: true
            }),
            new HtmlWebpackPlugin({
                template: '!!haml-loader!./src/pages/about/index.haml',
                filename: 'about/index.html',
                minify: true
            }),
            new HtmlWebpackPlugin({
                template: '!!haml-loader!./src/pages/styleguide/index.haml',
                filename: 'styleguide/index.html',
                minify: true
            }),
            new HtmlWebpackPlugin({
                template: '!!haml-loader!./src/materials/agrotourism/index.haml',
                filename: 'materials/agrotourism/index.html',
                minify: true
            }),
            new HtmlWebpackPlugin({
                template: '!!haml-loader!./src/destinations/yerevan/index.haml',
                filename: 'destinations/yerevan/index.html',
                minify: true
            }),
            new MiniCSSExtractPlugin()
        ],
    module:
    {
        rules:
            [
                // HTML
                {
                    test: /\.(html)$/,
                    use:
                        [
                            'html-loader'
                        ]
                },

                // HAML
                {
                    test: /\.haml$/,
                    use: [
                        { loader: 'html-loader' },
                        { loader: 'haml-loader' },
                    ],
                },


                // JS
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use:
                        [
                            'babel-loader'
                        ]
                },

                // CSS
                {
                    test: /\.(sa|sc|c)ss$/,
                    use:
                        [
                            'style-loader',
                            { loader: 'css-loader', options: { url: false } },
                            'sass-loader'
                        ]
                },

                // Images
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    type: 'asset/resource',
                    generator:
                    {
                        filename: 'assets/images/[hash][ext]'
                    }
                },

                // Fonts
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    type: 'asset/resource',
                    generator:
                    {
                        filename: 'assets/fonts/[hash][ext]'
                    }
                },

                // Sounds
                {
                    test: /\.(mp3|wav)$/,
                    type: 'asset/resource',
                    generator:
                    {
                        filename: 'assets/audio/[hash][ext]'
                    }
                }
            ]
    }
}
