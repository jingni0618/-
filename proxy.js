
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  middleware: [
    createProxyMiddleware({
      target: 'https://tarotwheel.vercel.app',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  ]
};
