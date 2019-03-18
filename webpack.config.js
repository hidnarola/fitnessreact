const webpack = require('webpack');
const path = require('path');

const {
    paths,
    outputFiles,
    rules,
    plugins,
    resolve,
    stats,
    IS_PRODUCTION,
    IS_DEVELOPMENT,
} = require('./webpack/config');

const devServer = require('./webpack/dev-server').devServer;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Default client app entry file
const entry = [
    path.join(paths.javascript, 'client.js'),
];

plugins.push(
    // Creates vendor chunk from modules coming from node_modules folder
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: outputFiles.vendor,
        minChunks(module) {
            const context = module.context;
            return context && context.indexOf('node_modules') >= 0;
        },
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor-1',
        filename: outputFiles.vendor1,
        minChunks(module, count) {
            var context = module.context;
            var targets = [
                "@fortawesome/fontawesome-svg-core",
                "@fortawesome/free-solid-svg-icons",
                "@fortawesome/react-fontawesome",
                "auth0-js",
                "auth0-lock",
                "autosuggest-highlight",
                "axios",
                "babel-polyfill",
                "classnames",
                "cropperjs",
                "emoji-mart",
                "express",
                "immutable",
                "isomorphic-fetch",
                "jquery",
                "jquery-ui-slider",
                "jwt-decode",
                "jwt-simple",
                "lodash",
                "moment",
                "prop-types",
                "rc-time-picker",
                "react",
                "react-autosuggest",
                "react-beautiful-dnd",
                "react-big-calendar",
                "react-bootstrap",
                "react-bootstrap-sweetalert",
                "react-calendar",
                "react-contenteditable",
                "react-cropper",
                "react-custom-scrollbars",
                "react-datepicker",
                "react-daterange-picker",
                "react-dom",
                "react-dropzone",
                "react-hot-loader",
                "react-html-parser",
                "react-icons",
                "react-images",
                "react-infinite-scroller",
                "react-paginate",
                "react-redux",
                "react-router",
                "react-router-dom",
                "react-select",
                "react-slick",
                "react-star-rating-component",
                "react-star-ratings",
                "react-table",
                "react-time-ago",
                "react-toastify",
                "react-tooltip",
                "recharts",
                "redux",
                "redux-form",
                "redux-saga",
                "remotedev-serialize",
                "round-slider",
                "socket.io-client",
                "sw-precache-webpack-plugin",
                "unitize",
                "webpack-manifest-plugin",
            ]
            return context && context.indexOf('node_modules') >= 0 && targets.find(t => new RegExp('\\\\' + t + '\\\\', 'i').test(context));
        },
    }),
    // Builds index.html from template
    new HtmlWebpackPlugin({
        template: path.join(paths.source, 'index.html'),
        path: paths.build,
        filename: 'index.html',
        minify: {
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            useShortDoctype: true,
        },
    })
);

if (IS_DEVELOPMENT) {
    // Development plugins
    plugins.push(
        // Enables HMR
        new webpack.HotModuleReplacementPlugin(),
        // Don't emmit build when there was an error while compiling
        // No assets are emitted that include errors
        new webpack.NoEmitOnErrorsPlugin()
    );

    // For IE babel-polyfill has to be loaded before react-hot-loader
    entry.unshift('babel-polyfill');
} else {
    plugins.push(
        new BundleAnalyzerPlugin()
    );
}

// Webpack config
module.exports = {
    devtool: IS_PRODUCTION ? false : 'cheap-eval-source-map',
    context: paths.javascript,
    watch: !IS_PRODUCTION,
    entry,
    output: {
        path: paths.build,
        publicPath: '/',
        filename: outputFiles.client,
    },
    module: {
        rules,
    },
    plugins,
    resolve,
    stats,
    devServer,
};
