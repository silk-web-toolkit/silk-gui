var CORE = (function() {
  var moduleData = {},
  debug = true;

  return {
    create_module : function(moduleID, creator) {
      var temp;
      if (typeof moduleID === 'string' && typeof creator === 'function') {
        temp = creator(Api.create(this, moduleID));
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
        mod.instance = mod.create(Api.create(this, moduleID));
        mod.instance.init();
      }
    },

    start_all : function() {
      var moduleID;
      for (moduleID in moduleData) {
        if (moduleData.hasOwnProperty(moduleID)) {
          this.start(moduleID);
        }
      }
    },

    registerEvents : function (evts, mod) {
      console.log("registering events");
      if (this.is_obj(evts) && mod) {
        if (moduleData[mod]) {
          moduleData[mod].events = evts;
        } else {
          this.log(1, "");
        }
      } else {
        this.log(1, "");
      }
    },

    triggerEvent : function(evt) {
      var mod;
      for (mod in moduleData) {
        if (moduleData.hasOwnProperty(mod)) {
          mod = moduleData[mod];
          if (mod.events && mod.events[evt.type]) {
            mod.events[evt.type](evt.data);
          }
        }
      }
    },

    dom : {
      find : function(selector, context) {
        var ret = {}, that = this, jqEls, i = 0;

        if (context && context.find) {
          jqEls = context.find(selector);
        } else {
          jqEls = jQuery(selector);
        }
                
        ret = jqEls.get();
        ret.length = jqEls.length;
        ret.query = function (sel) {
          return that.query(sel, jqEls);
        }
        return ret;
      },

      bind : function(element, evt, fn) {
        console.log('binding');
        console.log('element is : ' + element);
        console.log('evt is : ' + evt);
        if (element && evt) {
          if (typeof evt === 'function') {
            fn = evt;
            evt = 'click';
          }
          jQuery(element).bind(evt, fn);
        } else {
          // log wrong arguments
        }
      },

      unbind : function(element, evt, fn) {
        if (element && evt) {
          if (typeof evt === 'function') {
            fn = evt;
            evt = 'click';
          }
          jQuery(element).unbind(evt, fn);
        } else {
          // log wrong arguments 
        }
      }
    },

    dataRender : function(el, data) {
      $('#' + el).render(data);
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
