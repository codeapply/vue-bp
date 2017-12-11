const path = require('path');
const webpack = require('webpack');
const { UglifyJsPlugin } = webpack.optimize;
const ExtractText = require('extract-text-webpack-plugin');
const CleanWebpack = require('clean-webpack-plugin');

const merge = require('webpack-merge');
const base = require('./webpack.base');

const extractLESS = new ExtractText({ filename: 'styles.css' });
const extractCSS = new ExtractText({ filename: 'vendor.css' });

module.exports = merge(base, {
  output: {
    filename: '[name].[chunkhash:7].js',
    chunkFilename: 'chunk-[name]-[chunkhash:7].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract({
          use: 'css-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.scss$/,
        use: extractLESS.extract(
          {
            use: [
              'css-loader?importLoaders=1',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [require('autoprefixer')({ browsers: ['last 2 versions', 'safari 8'] })]
                }
              },
              'sass-loader'
            ],
            fallback: 'style-loader'
          }
        )
      }
    ]
  },
  plugins: [
    extractCSS,
    extractLESS,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CleanWebpack(['./dist'], { root: path.resolve(__dirname, '..') }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new UglifyJsPlugin()
  ]

});