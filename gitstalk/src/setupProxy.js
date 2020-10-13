const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', { target: 'https://github.com',
        changeOrigin: true,
        headers: {
            "Connection": "keep-alive"
        },
        pathRewrite: {
            '^/api': ''
        } }))
}