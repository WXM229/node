let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true);
  let obj = { errorCode: 1 }
  switch (pathname) {
    case '/api/list':
      fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (!err) {
          obj.data = JSON.parse(data);
          res.end(JSON.stringify(obj))
          return
        }
        res.end('error')
      })
      break;
    case '/api/del':
      fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
          res.end('error')
          return
        } else {
          let ary = JSON.parse(data);
          let tempAry = ary.filter(item => item.id != query.id);
          fs.writeFile('./data.json', JSON.stringify(tempAry), 'utf-8', (err, data) => {
            if (err) {
              res.end('error')
              return
            }
            res.end(JSON.stringify(obj))
          })
        }
      })
      break;
    case '/api/add':
      let reqData = [];
      req.on('data', (chunk) => {
        reqData.push(chunk);
      }).on('end', () => {
        reqData = Buffer.concat(reqData).toString();
        if (reqData.id === undefined) {
          // 不存在ID就是添加
          reqData.id = Math.random();
          fs.readFile('./data.json', 'utf-8', (err, data) => {
              if (err) {
                  obj.errorCode = 500;
                  res.end(JSON.stringify(obj));
                  return;
              }
              let tempAry = JSON.parse(data);
              tempAry.unshift(JSON.parse((reqData)))
              fs.writeFile('./data.json', JSON.stringify(tempAry), 'utf-8', (err) => {
                  if (err) {
                      obj.errorCode = 500;
                      res.end(JSON.stringify(obj));
                      return;
                  }
                  res.end(JSON.stringify(obj))
              })
          })
      } else {

        }

      })
      break;

  }


}).listen('9000', function () {
  console.log('端口起于9000')
})
