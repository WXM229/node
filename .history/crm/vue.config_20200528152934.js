module.exports = {
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            "^/api": {
                target: "http://localhost:9001",
                ws: true, // 默认true
                changeOrigin: true,
            }
        }
    }

};