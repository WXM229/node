let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer(function(req,res){
  console.log(req.url)
  let { pathname,query } = url.parse(req.url,true);

  let obj = {errorCode:1}

  switch(pathname){
      case '/api/list':
        fs.readFile('./data.json','utf-8',(err,data)=>{
            if(!err){
              obj.data = JSON.parse(data);
              res.end(JSON.stringify(obj))
              return
            }
            res.end('error')
        })
        break;
      case '/api/del':
        // 如果请求失败直接返回error   如果成功的话就直接操作数据
        fs.readFile('./data.json','utf-8',(err,data)=>{
          if(err){
            res.end('error')
            return
          }else{
            let ary = JSON.parse(data);
            let tempAry = ary.filter(item=>item.id!=query.id);
            fs.writeFile('./data.json',JSON.stringify(tempAry),'utf-8',(err,data)=>{
              if(!err){
                res.end(JSON.stringify(obj))
                return
              }
            })
          }
        })
        break; 
      case '/api/add':
        // post请求会一段一段的数据传递,添加数据是根据这条数据的id来做判断接口的添加还是编辑；若id是undefined 则走添加，
        // 并且赋值为随机id,如果添加失败code码为500，直接return回去即可，若成功则讲data这条数据 写入data.json中
        let reqData = []
        req.on('data',(chunk)=>{
          console.log(chunk)
          reqData.push(chunk)
        }).on('end',()=>{
          reqData = JSON.parse(Buffer.concat(reqData).toString());
          if(reqData.id === undefined){
            reqData.id = Math.random();
            fs.readFile('./data.json','utf-8',(err,data)=>{
              if(err){
                obj.errorCode = 500;
                res.end(JSON.stringify(obj))
                return
              }
              let ary = JSON.parse(data);
              ary.unshift(reqData)
              fs.writeFile('./data.json',JSON.stringify(ary),'utf-8',(err,data)=>{
                if(err){
                  obj.errorCode = 500;
                  res.end(JSON.stringify(obj));
                  return
                }else{
                  res.end(JSON.stringify(obj))
                }
              })
            })
          }else{
            fs.readFile('./data.json','utf-8',(err,data)=>{
              if(err){
                res.end('error');
                return
              }else{
                let ary = JSON.parse(data);
                ary = ary.map(item=>{
                  if(item.id == reqData.id){
                    return reqData
                  }
                  return item
                })
                fs.writeFile('./data.json',JSON.stringify(ary),'utf-8',(err,data)=>{
                  if(err){
                    obj.errorCode = 500;
                    res.end('error');
                    return
                  }
                  res.end(JSON.stringify(obj))
                })
              }
            })
          }
        })
        break;
      default:
        res.statusCode = 404;
        res.end()
        break;    
  }


}).listen('9000',()=>{
  console.log('9000端口')
})