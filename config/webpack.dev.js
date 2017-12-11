const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader']
      },
    ]
  },
  devServer: {
    port: 9090,
    inline: true,
    historyApiFallback: true,
    stats: {
      modules: false,
      children: false
    }
  }
});
