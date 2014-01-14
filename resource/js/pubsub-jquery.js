var PUBSUB = (function() {
  var debug = true;

  return {
    listen : function (core, evts, mod) {
      console.log("registering events");
      if (this.is_obj(evts) && mod) {
        if (core.moduleData[mod]) {
          core.moduleData[mod].events = evts;
        } else {
          this.log(1, "");
        }
      } else {
        this.log(1, "");
      }
    },

    notify : function(core, evt) {
      var mod;
      for (mod in core.moduleData) {
        if (core.moduleData.hasOwnProperty(mod)) {
          mod = core.moduleData[mod];
          if (mod.events && mod.events[evt.type]) {
            mod.events[evt.type](evt.data);
          }
        }
      }
    },

    is_obj : function(obj) {
      return jQuery.isPlainObject(obj);         
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
