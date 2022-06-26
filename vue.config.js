module.exports = {
    publicPath: '/',
    devServer: {
        port: 8888,
        proxy: {
            '/api': {
                target: 'http://localhost:8848/',
                changOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                },
            }
        }
    }
}
