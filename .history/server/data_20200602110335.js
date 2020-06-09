let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer(function(req,res){
  console.log(req.url)
  let { pathname } = url.parse(req.url,true);

  let obj = {errorCode:1}

  switch(pathname){
      case '/api/list':
        fs.readFile('./data.json','utf-8',(err,data)=>{
            if(!err){
              obj.data = JSON.parse(data);
              res.end(JSON.stringify(obj))
              return
            }
            res.end(JSON.stringify(obj))
        })
        break;
  }


}).listen('9000',()=>{
  console.log('9000端口')
})