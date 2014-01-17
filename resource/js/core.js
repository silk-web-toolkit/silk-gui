/******************************************************************************
the CORE

the core or kernel of our app, handles creation of the API and registration
 plus lifecycle of modules
******************************************************************************/

var CORE = (function() {
  var moduleData = {};
  fs = require('fs');
  var silkPath = process.env.SILK_PATH;
  if (silkPath == undefined) silkPath = process.env.HOME + "/.silk";
  var projectList = silkPath + "/spun-projects.txt";

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
      for (var modulePrep in moduleData) {
        if (moduleData.hasOwnProperty(modulePrep)) { this.prepare(modulePrep); }
      }
      for (var moduleStart in moduleData) {
        if (moduleData.hasOwnProperty(moduleStart)) { this.start(moduleStart); }
      }
    },

    getModulesData : function() {
      return moduleData;
    },

    getProjectList : function() {
      return projectList;
    }
  };
}());
