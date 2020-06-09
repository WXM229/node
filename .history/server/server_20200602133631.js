let fs = require('fs');
let http = require('http');
let url = require('url');

http.createServer(function (req, res) {
    // req.url 可以知道请求的路径
    console.log(req.url);
    // 因为前端过来的路径有可能带着参数，这时 需要后台把参数接出来，根据路径来判断前端要干什么
    let { pathname, query } = url.parse(req.url, true);
    // 设置请求体，为了防止乱码问题
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('content-type', 'text/html; charset=UTF-8');
    // res.statusCode = 500; // 不设置http状态码默认走200， 
    // res.statusMessage = 'hello' // 设置http状态码对应的信息


    // 前端请求过来之后，后端都会做一次判断，判断这个render是否在的登录阶re段，一般是通过cookie中，后台种植的
    // 某个字段来判断的；若还是

    let obj = {
        errorCode: 0
    };
    switch (pathname) {
        case '/api/list':
            // 若是这个路径，则代表前端想要请求列表数据
            fs.readFile('./data.json', 'utf-8', (err, data) => {
                if (!err) {
                    obj.data = JSON.parse(data)
                    res.end(JSON.stringify(obj));
                    return
                }
                res.end('error')
            })
            break;
        case '/api/login':
            obj.success = 'success';
            // 给前端种植cookie,';path=/'是为了 在所有的路径下都可以拿到参数
            res.setHeader('Set-Cookie', 'token=' + Date.now() + ';path=/');

            if (query.psd == '666') {
                // 我们自己规定的密码是666 的就是成功，否则就是失败，只是为了自己好调试
                res.end(JSON.stringify(obj));
            } else {
                obj.errorCode = 1;
                obj.errorMsg = 'noLogin';
                res.end(JSON.stringify(obj));
            }
            break;
        case '/api/del':
            // 执行删除的时候 前端传给了我们一个 id，通过query获取
            // 先读取data.json 然后删除；删除之后再去写入
            fs.readFile('./data.json', 'utf-8', (err, data) => {
                if (err) {
                    res.end('error');
                    return
                }
                // data是个字符串,需要把字符串转换成对象
                let ary = JSON.parse(data);
                // tempAry 就是删除之后的数组
                let tempAry = ary.filter(item => item.id != query.id);
                fs.writeFile('./data.json', JSON.stringify(tempAry), 'utf-8', err => {
                    if (err) {
                        res.end('error')
                        return;
                    }
                    res.end(JSON.stringify(obj)) // 后台删除成功，才能告诉前端 成功删除
                })

            })
            break;
        case '/api/add':
            let dataStr = '';
            // 后台接收前端的发来的数据
            req.on('data', function (str) {
                // post传递数据，是分成一段一段的数据传递，这时会触发该函数
                console.log(str)
                dataStr += str;
            });
            req.on('end', function () {
                //dataStr.toString() 获取到的是前端给的JSON字符串
                let reqData = JSON.parse(dataStr.toString());
                // reqData 就是前端给的对象；
                // 根据 reqData 是否有ID 来判断 要干的事；
                // 没ID 后端添加ID 然后把数据放到 data.json中
                if (reqData.id === undefined) {
                    // 不存在ID就是添加
                    reqData.id = Math.random();
                    fs.readFile('./data.json', 'utf-8', (err, data) => {
                        if (err) {
                            obj.errorCode = 5;// 后端操作失败
                            res.end(JSON.stringify(obj));
                            return;
                        }
                        let tempAry = JSON.parse(data);
                        tempAry.unshift(reqData);
                        fs.writeFile('./data.json', JSON.stringify(tempAry), 'utf-8', (err) => {
                            if (err) {
                                obj.errorCode = 5;// 后端操作失败
                                res.end(JSON.stringify(obj));
                                return;
                            }
                            res.end(JSON.stringify(obj));// 成功 直接返回一个 errorCode:0 即可
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
                                // 如果id相等 那就说明 就是要修改的那条数据
                                return reqData;
                            }
                            return item;
                        });
                        fs.writeFile('./data.json',JSON.stringify(tempAry),'utf-8',(err)=>{
                            if(err){
                                res.end('error');
                                return
                            }
                            res.end(JSON.stringify(obj)) 
                        })

                    })
                }
                console.log(dataStr.toString()); 
            })
            break;
        default:
            res.statusCode = 404;
            res.end()
            break;
    }

}).listen('9000', function () {
    console.log('服务起于9000端口')
})