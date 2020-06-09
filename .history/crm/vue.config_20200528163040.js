module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            "^/api": {
                target: "http://localhost:9002",
                ws: true, // 默认true
                changeOrigin: true,
            }
        }
    }

};