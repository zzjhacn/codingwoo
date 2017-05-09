String.prototype.format = function(args) {
  var result = this;
  if (arguments.length > 0) {
    if (arguments.length == 1 && typeof(args) == "object") {
      for (var key in args) {
        if (args[key] != undefined) {
          var reg = new RegExp("({)" + key + "(})", "g");
          result = result.replace(reg, args[key]);
        }
      }
    } else {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] != undefined) {
          //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
          var reg = new RegExp("({)" + i + "(})", "g");
          result = result.replace(reg, arguments[i]);
        }
      }
    }
  }
  return result;
}
String.prototype.contains = function(args) {
  return (this.indexOf(args[0]) >= 0)
}
Array.prototype.remove = function(obj) {
  for (var i = 0; i < this.length; i++) {
    if (this[i].$$hashKey === obj.$$hashKey) {
      this.splice(i, 1)
      return this
    }
  }
  return this
}

var pg_cfg = {
  "app.dbms.host": {
    title: "主机",
    methods: "CRUD",
    list: [{
      name: "hostname",
      desc: "主机名",
      css: "col-sm-1"
    }, {
      name: "ips",
      desc: "IP",
      list: true,
      css: "col-sm-3"
    }, {
      name: "scope",
      desc: "范围",
      css: "col-sm-1"
    }, {
      name: "owner",
      desc: "所有者",
      css: "col-sm-2"
    }, {
      name: "desc",
      desc: "描述",
      css: "col-sm-4"
    }],
    resolver: function(item) {
      console.log('resolving...')
      console.log(item)
    }
  },
  "app.monitor.heartbeat": {
    title: "心跳",
    methods: "R",
    list: [{
      name: "appId",
      desc: "应用ID"
    }, {
      name: "host",
      desc: "主机"
    }],
    resolver: function(item) {}
  },
  "app.monitor.config": {
    title: "监控配置",
    methods: "CRUD",
    desc: {
      capability: {
        multiple: true,
        placeholder: "select som caps",
        addBlankOption: true
      },
      capArgs: {},
      targetType: {
        desc: "目标类型"
      },
      target: {
        desc: "目标"
      },
      cron: {
        widthRatio: "2"
      },
      warnWay: {},
      warnReceivers: {
        widthRatio: "2"
      },
      status: {
        doc: {
          value: "0,1"
        }
      },
      poolSize: {
        type: "number",
        min: 1,
        max: 5
      }
    }
  }
}

var menus = {
  Dashboard: {
    icon: "fa fa-dashboard",
    top: "app.dashboard",
    sub: {
      dashboard: {
        stat: "app.dashboard",
        icon: "fa fa-dashboard",
        tips: 3
      }
    }
  },
  Local: {
    icon: 'glyphicon glyphicon-th',
    top: "app.local",
    sub: {
      mvnviewer: {
        icon: 'glyphicon glyphicon-th',
        stat: 'app.local.mvn'
      },
      note: {
        stat: 'app.local.note',
        icon: 'icon icon-note'
      }
    }
  },
  DBMS: {
    icon: 'icon icon-layers',
    top: "app.dbms",
    sub: {
      host: {
        stat: 'app.dbms.host',
        icon: 'fa fa-linux'
      },
      app: {
        stat: 'app.dbms.app'
      },
      deployment: {
        stat: 'app.dbms.deployment'
      },
      props: {
        stat: 'app.dbms.props'
      }
    }
  },
  Monitor: {
    icon: 'fa fa-warning',
    top: 'app.monitor',
    sub: {
      heartbeat: {
        stat: 'app.monitor.heartbeat',
        icon: 'icon icon-heart'
      },
      warning: {
        stat: 'app.monitor.warning',
        icon: 'fa fa-warning'
      },
      config: {
        stat: 'app.monitor.config',
        icon: 'fa fa-wrench'
      }
    }
  }
}
