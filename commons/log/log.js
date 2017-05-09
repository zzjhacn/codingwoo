require('../stringFormater');

function log() {
  if (arguments.length == 0) {
    return
  }
  if (arguments.length == 1) {
    console.log(arguments[0])
    return
  }
  var msg = arguments[0]
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i]
  }
  console.log(msg.format(args))
}

exports.log = log
