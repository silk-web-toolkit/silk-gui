CORE.create_module("projects", function(api) {
  var gui = require('nw.gui'),
  spawn = require('child_process').spawn,
  fs = require('fs');

  var silkProcess;
  var openChildWnds = new Array();
  var SILK_RELOAD = "reload";
  var silkPath = process.env.SILK_PATH;
  if (silkPath == undefined) silkPath = process.env.HOME + "/.silk";
  var PROJECT_LIST = silkPath + "/spun-projects.txt";
  var projectList;

  function spin(project) {
    var msg = "";
  
    try { fs.statSync(project);}
    catch (err) {
      api.notify({ type: 'log-spin', data: 'Oh Snap! Directory does not exist.' });
      return;
    }

    try { silk.kill("SIGHUP"); } 
    catch (err) { }
  
    api.notify({ type: 'log-spin', data: 'Spinning, please wait...' });
  }

  function removeChildElements(parent) {
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.lastChild);
    }
  }

  return {
    init : function() {
      console.log("init projects");
      projectList = api.find("#project-list")[0];
      this.buildProjectList(true);
    },

    buildProjectList : function(spinOnceLoaded) {
      console.log("building project list");
      fs.readFile(PROJECT_LIST, 'utf8', function (err, data) {
        removeChildElements(projectList);
        try { 
          var items = data.split('\n');
          console.log("items is : " + items);
          if (items.length == 0) {
            api.notify({ type: 'log-spin', data: 'Please add a Silk Project.' });
            return;
          }
          for (i = 0; i < items.length-1; i++) {
            api.notify({ type: 'log-spin', data: 'Processing item' });
            /*var active = ""; 
            if (i == 0)  active = "active";
            var listItem = createListItem(active);

            var csv = items[i].split(",");
            var name = getProjectNameFromPath(csv[0]);
            var onClick = function() { spin(this.title);};
            var link = createLink(name, csv[0], onClick);
            listItem.appendChild(link);

            // Check if directory exists
            try { fs.statSync(csv[0]);}
            catch (err) { 
              link.className = "project-not-found";
              link.disabled = true; 
            } 
            list.appendChild(listItem);*/
          }
          if (spinOnceLoaded) {
            spin(items[0].split(",")[0]);
          }
        } catch (err) {
          console.log("error is : " + err);
          api.notify({ type: 'log-spin', data: 'Please add a Silk Project.' });
        }
      });
    },

    destroy : function() {
      // do nothing
    }
  }
});

CORE.create_module("spin-status", function(api) {
  var spinLogger;

  return {
    init : function() {
      console.log("init spin status");
    	spinLogger = api.find("#last-spin-logger")[0];
      api.listen({
        'log-spin': this.logSpin
      });
    },

    destroy : function() {
      api.ignore(['log-spin']);
    },

    logSpin : function(status) {
      console.log("attempting to write to spinLogger comp");
      spinLogger.innerHTML = status;
    }
  };
});

CORE.create_module("log-poker", function(api) {
  var logButton;

  return {
    init: function() {
      console.log("init log poker");
      logButton = api.find("#log_button")[0];

      api.addEvent(logButton, "click", this.handleLogEntry);
    },

    destroy : function() {
      api.removeEvent(spinLogger, "click", this.handleLogEntry);
    },

    handleLogEntry : function() {
      console.log("attempting to trigger log-spin");
      api.notify({
        type: 'log-spin',
        data: 'Log entry message'
      });
    }
  };
});

CORE.start_all();
