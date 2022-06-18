module.exports = {
    publicPath: '/',
    devServer: {
        port: 8888,
        proxy: {
            '/api': {
                target: 'http://localhost:8088/',
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
            }
        }
    }
}
