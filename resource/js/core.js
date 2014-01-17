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
        if (temp.create && typeof temp.create === 'function' && temp.destroy && typeof temp.destroy === 'function') {
          temp = null;
          moduleData[moduleID] = {
            create : creator,
            instance : null
          };
        } else {
          error("Module '" + moduleID + "' Registration : FAILED : instance has no create or destory functions");
        }
      } else {
        error(1, "Module '" + moduleID + "' Registration : FAILED : one or more arguments are of incorrect type");
      }
    },

    prepare : function(moduleID) {
      var mod = moduleData[moduleID];
      if (mod) {
        mod.instance = mod.create(Api.create(this, DOM, PUBSUB, moduleID));
        debug("bootstrap module : " + moduleID);
        mod.instance.bootstrap();
      }
    },

    start : function(moduleID) {
      var mod = moduleData[moduleID];
      if (mod) {
        debug("creating module : " + moduleID);
        mod.instance.create();
      }
    },

    startAll : function() {
      var moduleID;
      for (moduleID in moduleData) {
        if (moduleData.hasOwnProperty(moduleID)) {
          this.prepare(moduleID);
        }
      }
      var cModuleID;
      for (cModuleID in moduleData) {
        if (moduleData.hasOwnProperty(cModuleID)) {
          this.start(cModuleID);
        }
      }
    },

    getModulesData : function() {
      return moduleData;
    }
  };
}());
