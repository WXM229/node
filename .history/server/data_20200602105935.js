let http = require('http');

http.createServer(function(req,res){
  console.log(req.url)

}).listen('9000',()=>{
  console.log('9000端口')
})