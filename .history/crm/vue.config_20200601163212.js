module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            "^/api": {
                target: "http://10.10.83.77:9988/",
                ws: true, // 默认true
                changeOrigin: true,
            }
        }
    }

};