let http = require("http");
let fs = require("fs");
let url = require("url");

http.createServer(function (req, res) {
    let {pathname, query} = url.parse(req.url, true);
    console.log(pathname, query);
    res.setHeader('access-control-allow-origin', '*'); // 设置跨域
    res.setHeader('content-type', 'text/html; charset=UTF-8'); // 设置类型
    let obj = {
        errorCode: 1
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
            }).on('end',()=>{
                body = Buffer.concat(body).toString();
                let reqData = JSON.parse(body);
                if(reqData.id ===undefined){
                    reqData.id = Math.random();
                    fs.readFile('./data.json','utf-8',(err,data)=>{
                        if(err){
                            obj.errorCode = 500;
                            res.end(JSON.stringify(obj));
                            return
                        }
                        let tempAry = JSON.parse(data);
                        tempAry.unshift(reqData)
                        fs.writeFile('./data.json',JSON.stringify(tempAry),'utf-8',err=>{
                            if(err){
                                obj.errorCode = 500;
                                res.end(JSON.stringify(obj));
                                return
                            }
                            res.end(JSON.stringify(obj))
                        })
                    })
                }else{
                    fs.readFile('./data.json','utf-8',(err,data)=>{
                        if(err){
                            res.end('error');
                            return
                        }
                        let tempAry = JSON.parse(data);
                        tempAry = tempAry.map(item=>{
                            if (item.id == reqData.id){
                                return reqData;
                            }
                            return item;
                        });
                        fs.writeFile('./data.json',JSON.stringify(tempAry),'utf-8',(err)=>{
                            if(err){
                                res.end('error');
                                return
                            }
                            res.end(JSON.stringify(obj)) // 改写成功返回 errorCode:0
                        })

                    })
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