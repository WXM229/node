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
    switch(pathname){
        case "/api/list" :
            fs.readFile('./data.json','utf-8',(err,data)=>{
                console.log(data)
                if(!err){
                    obj.data = JSON.parse(data)
                    res.end(JSON.stringify(obj))
                    return
                }
                else {
                    res.end("error")
                }
            })
            break;
        case "/api/del" :
            fs.readFile('./data.json','utf-8',(err,data)=>{
                if(err){
                    res.end('error')
                    return
                }else{
                    let ary = JSON.parse(data)
                    let tempAry = ary.filter(item=>item.id!=query.id)
                    fs.writeFile('./data.json',JSON.stringify(tempAry),'utf-8',err=>{
                        if(err){
                            res.end('error')
                            return;
                        }
                        else{
                            res.end(JSON.stringify(obj))
                        }
                    })
                }
            })
            break;
        case "/api/add":
            let body = [];
            req.on('data',(chunk)=>{
                body.push(chunk)
                console.log(body)
            }).on('end',()=>{
                body = Buffer.concat(body).toString();
                console.log(body)
                let reqData = JSON.parse(body);
                console.log(reqData)
                if(reqData.id === undefined){
                    
                }
            })
            break; 
        default:
            res.statusCode = 404;
            res.end()
            break;           
    }
}).listen("9000", function () {
    console.log("服务起于9000")
})