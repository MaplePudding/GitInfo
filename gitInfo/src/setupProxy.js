const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/test', { target: 'https://api.github.com/',
        changeOrigin: true,
        headers: {
            "Connection": "keep-alive"
        },
        pathRewrite: {
            '^/test': ''
        } }))
}