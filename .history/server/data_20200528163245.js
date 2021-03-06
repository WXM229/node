let http = require("http");
let fs = require("fs");
let url = require("url");

http.createServer(function (req, res) {
    // console.log(req, res)
    let {pathname, query} = url.parse(req.url, true);
    console.log(pathname, query);
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('content-type', 'text/html; charset=UTF-8');
    let obj = {
        errorCode: 0
    };
    switch (pathname) {
        case '/api/list':
            fs.readFile("./data.json", "utf-8", (err, data) => {
                console.log(data)
                if (!err) {
                    obj.data = JSON.parse(data);
                    res.end(JSON.stringify(obj));
                    return
                }
                res.end("error")
            });
            break;
        case '/api/del':
            fs.readFile("./data.json", "utf-8", (err, data) => {
                if (err) {
                    res.end("error")
                    return
                }
                let ary = JSON.parse(data)
                let tempAry = ary.filter(item => item.id != query.id)
                fs.writeFile('./data.json', JSON.stringify(tempAry), "utf-8", (err, data) => {
                    if (err) {
                        res.end("error")
                        return
                    }
                    res.end(JSON.stringify(obj))
                })
            })
            break;


    }
}).listen("9002", function () {
    console.log("服务起于9002")
})