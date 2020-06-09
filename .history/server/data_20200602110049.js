let http = require('http');
let url = require('url')

http.createServer(function(req,res){
  console.log(req.url)
  let { pathname } = url.parse(req.url,true);

  

}).listen('9000',()=>{
  console.log('9000端口')
})