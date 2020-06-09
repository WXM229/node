let http = require('http');
let url = require('url');
http.createServer(function(req,res){
  let {pathname} = url.parse(req.url,true)
  console.log(pathname)

}).listen('9000',()=>{
  console.log("9000")
})