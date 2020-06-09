let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer((req,res)=>{
  let { pathname,query } = url.parse(req.url,true);
  let obj = { errorCode :1 }
  switch(pathname){
    case '/api/list':
      
      break;

  }

  
}).listen('9000',function(){
  console.log('端口起于9000')
})
