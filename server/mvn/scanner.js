const fs = require('fs')
const path = require('path')
const repo = require('./repo');
const log = require('../../commons/log/log')

var repos = {}
var scanned = false
var exts = [".jar", ".war"]
var excludes = ["sources.jar", "javadoc.jar", "standalone.jar", "tests.jar"]

var scan = function(dir, rescan, min) {
  if (scanned && !rescan) {
    return collect(min)
  }

  log.log("scanning...")
  repos = {}
  scanImpl(dir)
  scanned = true
  log.log("scan finished...")
  return collect(min)
}

var collect = function(min){
  if (!min) {
    min = 1
  }
  var result = {}
  Object.keys(repos).forEach(function(r) {
    if (repos[r].length > min) {
      result[r] = repos[r]
    }
  })
  return result
}

var scanImpl = function(dir) {
  fs.readdirSync(dir).forEach(function(file) {
    var pathname = path.join(dir, file)
    var stat = fs.statSync(pathname)
    if (stat.isDirectory()) {
      scanImpl(pathname)
      return
    }

    var add = false
    for (var e in exts) {
      if (path.extname(pathname) == exts[e]) {
        add = true
        break
      }
    }
    if (!add) {
      return
    }
    for (var e in excludes) {
      if (path.basename(pathname).indexOf(excludes[e]) > 0) {
        return
      }
    }

    addRepo(pathname)
  })
}

var report = function(min) {
  if (!min) {
    min = 1
  }
  Object.keys(repos).forEach(function(r) {
    if (repos[r].length > min) {
      log.log(r)
      repos[r].forEach(function(v) {
        log.log("\t{1}k\t{0}", v.version, v.size / 1000)
      })
    }
  })
}

var addRepo = function(pathname) {
  var r = repo.repo(pathname)
  if (!repos[r.path]) {
    repos[r.path] = []
  }
  repos[r.path].push(r)
}

exports.scan = scan
exports.report = report
