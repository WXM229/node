let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer(function (req, res) {
  let { pathname, query } = url.parse(req.url, true);
  console.log(pathname)
  let obj = { errorCode: 1 }
  switch (pathname) {
    case '/api/list':
      fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (!err) {
          obj.data = JSON.parse(data);
          res.end(JSON.stringify(obj))
          return
        }
      })
      break
    case '/api/del':
      fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
          res.end('error')
          return
        } else {
          let ary = JSON.parse(data);
          let tempAry = ary.filter(item => item.id != query.id);
          fs.writeFile('./data.json', JSON.stringify(tempAry), 'utf-8', (err, data) => {
            if (!err) {
              res.end(JSON.stringify(obj))
              return
            }
          })
        }
      })
      break
    case '/api/add':
      let reqData = [];
      req.on('data', (chunk) => {
        reqData.push(chunk)
      }).on('end', () => {
        reqData = JSON.parse(Buffer.concat(reqData).toString());
        console.log(reqData)
        if (reqData.id === undefined) {
          reqData.id = Math.random();
          fs.readFile('./data.json', 'utf-8', (err, data) => {
            if (err) {
              obj.errorCode = 500;
              res.end(JSON.stringify(obj))
              return
            } else {
              let ary = JSON.parse(data);
              ary.unshift(reqData);
              fs.writeFile('./data.json', JSON.stringify(ary), 'utf-8', (err, data) => {
                if (err) {
                  obj.errorCode = 500;
                  res.end(JSON.stringify(obj))
                  return
                } else {
                  res.end(JSON.stringify(obj))
                }
              })
            }
          })
        } else {
          fs.readFile('./data.json', 'utf-8', (err, data) => {
            if (err) {
              obj.errorCode = 500;
              res.end('error')
              return
            } else {
              let ary = JSON.parse(data);
              ary = ary.map(item => {
                if (item.id === query.id) {
                  return reqData
                }
                return item
              })
              fs.writeFile('./data.json', JSON.stringify(ary), 'utf-8', (err, data) => {
                if (err) {
                  obj.errorCode = 500;
                  res.end('error');
                  return
                } else {
                  res.end(JSON.stringify(obj))
                }
              })
            }
          })
        }
      })
      break
    default:
      res.statusCode = 404;
      res.end();
      break
  }

}).listen('9000', () => {
  console.log('9000')
})