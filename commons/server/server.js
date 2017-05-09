var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var mime = require('./mime').types

var debugEnable = false;
function debug(msg){
  if(debugEnable){
    console.log(msg)
  }
}

function server(PORT, mapping, resolver) {
  if (!PORT) {
    console.log("port 必须指定")
    return
  }
  http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname
    if (mapping && mapping[pathname]) {
      response.writeHead(200, {
        'Content-Type': mapping[pathname].contentType || "text/plain"
      });
      response.write(JSON.stringify(mapping[pathname].func()), "binary")
      response.end()
    } else {
      debug("Original path : " + pathname)
      var realPath = path.join("./", pathname)
      if (realPath == './') {
        realPath = './index.html'
      }
      debug("Joined path : " + realPath)
      if(resolver && typeof resolver == 'function'){
        realPath = resolver(realPath)
      }
      debug("Resolved path : " + realPath)
      var ext = path.extname(realPath)
      ext = ext ? ext.slice(1) : 'unknown'
      fs.exists(realPath, function(exists) {
        if (!exists) {
          response.writeHead(404, {
            'Content-Type': 'text/plain'
          })
          response.write("This request URL [" + pathname + "] was not found on this server.")
          response.end()
        } else {
          fs.readFile(realPath, "binary", function(err, file) {
            if (err) {
              console.log(err)
              response.writeHead(500, {
                'Content-Type': 'text/plain'
              });
              response.end(err)
            } else {
              var contentType = mime[ext] || "text/plain";
              response.writeHead(200, {
                'Content-Type': contentType
              });
              response.write(file, "binary")
              response.end()
            }
          })
        }
      })
    }
  }).listen(PORT)
  console.log("Server runing at port: " + PORT + ".")
}
exports.server = server
exports.debug = debug
