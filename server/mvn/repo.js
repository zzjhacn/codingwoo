const fs = require('fs')
const path = require('path')
const log = require('../../commons/log/log')

var repo = function(file) {
  var jar = path.parse(file)
  var repo = {}
  repo.version = path.basename(jar.dir)
  repo.path = path.dirname(jar.dir)
  repo.name = path.basename(path.dirname(jar.dir))
  repo.fullname = jar.base
  repo.ext = jar.ext
  repo.size = fs.statSync(file).size
  return repo
}

exports.repo = repo
