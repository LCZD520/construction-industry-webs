module.exports = {
    publicPath: '/',
    devServer: {
        //open: true,
        //host:'localhost',
        port: 8888,
        //https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8848/',
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
            }
        }
    }
}