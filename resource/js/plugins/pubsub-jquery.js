/******************************************************************************
PUBSUB plugin

jQuery flavour
******************************************************************************/

var PUBSUB = (function() {
  var debug = true;

  return {
    listen : function (core, evts, mod) {
      if (this.is_obj(evts) && mod) {
        if (core.getModulesData()[mod]) {
          core.getModulesData()[mod].events = evts;
        } else {
          info("can't find module to attach listenable events to");
        }
      } else {
        info("unable to queue events to listen to");
      }
    },

    notify : function(core, evt) {
      var mod;
      for (mod in core.getModulesData()) {
        if (core.getModulesData().hasOwnProperty(mod)) {
          mod = core.getModulesData()[mod];
          if (mod.events && mod.events[evt.type]) {
            mod.events[evt.type](evt.data);
          }
        }
      }
    },

    is_obj : function(obj) {
      return jQuery.isPlainObject(obj);
    }
  };
}());
