var CORE = (function() {
  var moduleData = {},
  debug = true;

  return {
    createModule : function(moduleID, creator) {
      var temp;
      if (typeof moduleID === 'string' && typeof creator === 'function') {
        temp = creator(Api.create(this, DOM, PUBSUB, moduleID));
        if (temp.init && typeof temp.init === 'function' && temp.destroy && typeof temp.destroy === 'function') {
          temp = null;
          moduleData[moduleID] = {
            create : creator,
            instance : null
          };
        } else {
          this.log(1, "Module '" + moduleID + "' Registration : FAILED : instance has no init or destory functions");
        }
      } else {
        this.log(1, "Module '" + moduleID + "' Registration : FAILED : one or more arguments are of incorrect type");
      }
    },

    start : function(moduleID) {
      var mod = moduleData[moduleID];
      if (mod) {
        mod.instance = mod.create(Api.create(this, DOM, PUBSUB, moduleID));
        mod.instance.init();
      }
    },

    startAll : function() {
      var moduleID;
      for (moduleID in moduleData) {
        if (moduleData.hasOwnProperty(moduleID)) {
          this.start(moduleID);
        }
      }
    },

    debug : function(on) {
      debug = on ? true : false;
    },

    log : function(severity, message) {
      if (debug) {
        console[(severity === 1) ? 'log' : (severity === 2) ? 'warn' : 'error'](message);
      }
    }
  };
}());
