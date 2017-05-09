#!/usr/local/bin/node

const fs = require('fs')
const path = require('path')

const log = require('./commons/log/log')
const server = require('./commons/server/server')

const scanner = require('./server/mvn/scanner')

var getMin = function(p) {
  // var f = path.parse(p)
  // if (f.ext == ".js" || f.ext == ".css") {
  //     var min = "./" + f.dir + "/" + f.name + ".min" + f.ext
  //     if (fs.existsSync(min)) {
  //         return min
  //     }
  // }
  return p
}

server.server(8124, {
  "/mvntree": {
    contentType: "application/json",
    func: function() {
      return scanner.scan("/Users/gray/.m2/repository/", false, 0)
    }
  },
  "/mvnclean": {
    contentType: "application/json",
    func: function() {
      return scanner.scan("/Users/gray/.m2/repository/", false, 5)
    }
  }
}, function(path) {
  server.debug("path to resolve:" + path)
  if (path && (path == './index.html' || path == 'index.html' || path == '\\')) {
    return path
  }
  if (path.indexOf('node_modules') == 0 || path.indexOf('commons') == 0) {
    return getMin(path)
  }
  return getMin('client/' + path)
})
