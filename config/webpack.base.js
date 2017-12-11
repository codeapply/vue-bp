const path = require('path');
const webpack = require('webpack');
const HtmlWebpack = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const { CommonsChunkPlugin } = webpack.optimize;

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  stats: {
    modules: false,
    children: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: 'file-loader?name=img/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf|htaccess)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: module => /node_modules/.test(module.resource)
    }),
    new HtmlWebpack({
      template: './src/index.html',
      chunks: [
        'runtime',
        'vendor',
        'main'
      ],
      chunksSortMode: 'manual'
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: ['vendor', 'main'].reverse(),
      fileBlacklist: [/\.css/, /\.map/]
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      as: 'script',
      include: 'asyncChunks'
    })
  ]
};
