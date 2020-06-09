let http = require("http");
let fs = require("fs");
let url = require("url");

http.createServer(function (req, res) {
    let {pathname, query} = url.parse(req.url, true);
    console.log(pathname, query);
    res.setHeader('access-control-allow-origin', '*'); // 设置跨域
    res.setHeader('content-type', 'text/html; charset=UTF-8'); // 设置类型
    let obj = {
        errorCode: 0
    };
    switch (pathname) {
        case "/api/list":
            fs.readFile('./data.json',(err,data)=>{
                console.log(data)
            })
            break;
    }
}).listen("9000", function () {
    console.log("服务起于9000")
})