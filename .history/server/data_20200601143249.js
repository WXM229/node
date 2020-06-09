let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer((req,res)=>{
  let {pathname,query} = url.parse()

  
}).listen('9000',function(){
  console.log('端口起于9000')
})
