module.exports = {
    lintOnSave: false,
    publicPath: '/',
    devServer: {
        port: 8888,
        proxy: {
            '/api': {
                // target: 'http://47.107.41.106:11007/',
                target: 'http://127.0.0.1:8848/',
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
            }
        }
    }
}
