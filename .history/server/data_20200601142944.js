let http = require('http');

http.createServer((req,res)=>{
  console.log(req,res)
}).listen('9000',function(){
  console.log('端口起于9000')
})
