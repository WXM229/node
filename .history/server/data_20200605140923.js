let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer(function (req, res) {
  let { pathname } = url.parse(req.url, true);
  console.log(pathname)
  switch (pathname) {
    case '/api/list':
      
      break
  }

}).listen('9000', () => {
  console.log('9000')
})