/******************************************************************************
the CORE

the core or kernel of our app, handles creation of the API and registration
 plus lifecycle of modules
******************************************************************************/

var CORE = (function() {
  var moduleData = {};
  fs = require('fs');

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
          error("Module '" + moduleID + "' Registration : FAILED : instance has no init or destory functions");
        }
      } else {
        error(1, "Module '" + moduleID + "' Registration : FAILED : one or more arguments are of incorrect type");
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

    getModulesData : function() {
      return moduleData;
    }
  };
}());
