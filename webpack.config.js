'use strict';

const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
    experiments: {
        outputModule: true,
    },
    externals: {
        'ckeditor5/src/core': '@brkh/ckeplugins/cke-translator-core.js',
        'ckeditor5/src/engine': '@brkh/ckeplugins/cke-translator-engine.js',
        'ckeditor5/src/ui': '@brkh/ckeplugins/cke-translator-ui.js',
        'ckeditor5/src/utils': '@brkh/ckeplugins/cke-translator-utils.js'
    },
    entry: './node_modules/@ckeditor/ckeditor5-font/src/font.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'cke-font-plugin.js',
        library: {
            type: 'module',
        },
    },
    module: {
        rules: [
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,

                use: ['raw-loader']
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,

                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: styles.getPostCssConfig({
                                themeImporter: {
                                    themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                                },
                                minify: true
                            })
                        }
                    }
                ]
            }
        ]
    },

    // Useful for debugging.
    devtool: 'source-map',

    // By default webpack logs warnings if the bundle is bigger than 200kb.
    performance: { hints: false }

};