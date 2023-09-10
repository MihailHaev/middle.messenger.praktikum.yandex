const { merge } = require('webpack-merge');
const common = require('./base.config');
const { OUTPUT_DIR } = require('./helpers');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 3000,
    proxy: [
      {
        context: ['/proxy-api/**'],
        target: 'https://proxy-api/api/',
        pathRewrite: { '^/api/': '/' },
        secure: false,
        onProxyReq: (proxyReq) => {
          proxyReq.setHeader('Host', 'my-custom-host');
        },
      },
    ],
    watchFiles: 'src/**/*',
    hot: true,
    static: {
      directory: OUTPUT_DIR,
    },
    historyApiFallback: true,
  },
});
