let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer(function(req,res){
    let { pathname,query } = url.parse(req.url,true)
    let obj = {errorCode:1}
    switch(pathname){
        case '/api/list':
                fs.readFile('./data.json','utf-8',(err,data)=>{
                    if(!err){
                        obj.data = JSON.parse(data);;
                        res.end(JSON.stringify(obj));
                        return
                    }
                })
            break;
        case '/api/del':
            fs.readFile('./data.json','utf-8',(err,data)=>{
                if(err){
                    res.end('error')
                    return
                }else{
                    let ary = JSON.parse(data)
                    ary = ary.map(item=>item.id!=query.id);
                    fs.writeFile('./data.json',JSON.stringify(ary),'utf-8',(err,data)=>{
                        
                    })
                }
            })
            break;    
    }


}).listen('9000',()=>{
    console.log('9000')
})