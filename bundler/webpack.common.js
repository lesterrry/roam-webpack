const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob');

const TOP_LEVEL_PAGES = ['work', 'destinations', 'materials', 'about', 'styleguide', 'preview'];

const generateHtmlPlugins = (folderName, usePrefix) => {
    const templateFiles = glob.sync(path.resolve(__dirname, `../src/${folderName}/**/*.haml`));

    return templateFiles.map(item => {
        const parts = item.split('/');
        const name = parts[parts.length - 2];

        console.log('template', '!!haml-loader!' + item)
        console.log('name', `${usePrefix ? folderName : ''}${name}/index.html`)

        return new HtmlWebpackPlugin({
            template: '!!haml-loader!' + item,
            filename: `${usePrefix ? folderName + '/' : ''}${name}/index.html`,
            minify: true,
        });
    });
}

let generatedPlugins = [];

TOP_LEVEL_PAGES.forEach(folder => generatedPlugins.push(...generateHtmlPlugins(`pages/${folder}`, false)));

generatedPlugins.push(...generateHtmlPlugins(`destinations`, true));

generatedPlugins.push(...generateHtmlPlugins(`materials`, true));

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
                template: '!!haml-loader!./src/pages/main/index.haml',
                filename: 'index.html',
                minify: true
            }),
            
            ...generatedPlugins,

            new MiniCSSExtractPlugin()
        ],
    module:
    {
        rules:
            [
                // HTML
                {
                    test: /\.(html)$/,
                    use: [
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
                    use: [
                        'babel-loader'
                    ]
                },

                // CSS
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
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
