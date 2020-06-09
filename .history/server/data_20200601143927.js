let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer((req,res)=>{
  let { pathname,query } = url.parse(req.url,true);
  let obj = { errorCode :1 }
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
      fs.readFile('./data.json','utf-8',(err,data)=>{
        if(err){
            res.end('error')
            return
        }else{
          
        }
      })
      break

  }

  
}).listen('9000',function(){
  console.log('端口起于9000')
})
