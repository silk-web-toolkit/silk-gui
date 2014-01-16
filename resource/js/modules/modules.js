/******************************************************************************
early experimental modules

will be refactored and split out as we progress with the app
******************************************************************************/

CORE.createModule("spin", function(api) {
  var spawn = require('child_process').spawn;

  var silkProcess;
  var openChildWnds = new Array();
  var SILK_RELOAD = "reload";

  return {
    init : function() {
      console.log("init spin module");
      //api.listen({
        //'spin': this.spin
      //});
    },

    spin : function(project) {
      console.log("attempting spin in spin module");
      var msg = "";

      try { fs.statSync(project);}
      catch (err) {
        api.notify({ type: 'log-spin', data: 'Oh Snap! Directory does not exist.' });
        return;
      }

      try { silkProcess.kill("SIGHUP"); }
      catch (err) { }

      api.notify({ type: 'log-spin', data: 'Spinning, please wait...' });

      silkProcess = spawn('silk', [SILK_RELOAD], {cwd: project});
      silkProcess.stdout.on('data', function(data) {
        msg += data;
        if (msg.indexOf("Site spinning is complete") !== -1) {
          api.notify({ type: 'log-spin', data: 'Congratulations, your site was successfully spun!' });
          for (i = 0; i < openChildWnds.length; i++) {
            openChildWnds[i][1].reload();
          }
          api.notify({ type: 'build-projects', data: '' });
          msg = "";
        } else if (msg.indexOf("Cause of error:") !== -1) {
          api.notify({ type: 'log-spin', data: 'Oh Snap! ' + error });
          msg = "";
        }
      });
    },

    destroy : function() {
      api.ignore(['spin']);
    }
  }
});

CORE.createModule("projects", function(api) {
  var gui = require('nw.gui'); //,
  //spawn = require('child_process').spawn,

  //var silkProcess;
  var openChildWnds = new Array();
  //var SILK_RELOAD = "reload";
  var silkPath = process.env.SILK_PATH;
  if (silkPath == undefined) silkPath = process.env.HOME + "/.silk";
  var PROJECT_LIST = silkPath + "/spun-projects.txt";
  var projectList;

  function removeChildElements(parent) {
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.lastChild);
    }
  }

  function createListItem(cls) {
    var listItem = document.createElement("li");
    listItem.className = cls;
    return listItem;
  }

  /* A link with no url - design choice more than anything else */
  function createLinkButton(name, title, onclick) {
    var link = document.createElement("a");
    link.href = "#";
    link.innerHTML = name;
    link.title = title;
    link.onclick = onclick;
    return link;
  }

  function getProjectNameFromPath(path) {
    var index = path.lastIndexOf("/");
    if (index == -1) index = path.lastIndexOf("\\");
    return path.substring(index +1);
  }

  return {
    init : function() {
      projectList = api.find("#project-list")[0];
      //api.listen({
        //'build-projects' : this.buildProjectList(false)
      //});
      //this.buildProjectList(true);
    },

    buildProjectList : function(spinOnceLoaded) {
      fs.readFile(PROJECT_LIST, 'utf8', function (err, data) {
        removeChildElements(projectList);
        try {
          var items = data.split('\n');
          if (items.length == 0) {
            api.notify({ type: 'log-spin', data: 'Please add a Silk Project.' });
            return;
          }
          for (i = 0; i < items.length-1; i++) {
            api.notify({ type: 'log-spin', data: 'Processing item' });
            var active = "";

            if (i == 0)  active = "active";
            var listItem = createListItem(active);

            var csv = items[i].split(",");
            var name = getProjectNameFromPath(csv[0]);

            var onClick = function() {
              console.log("spinning : " + this.title);
              //spin(this.title);
              api.notify({ type: 'spin', data: this.title });
            };
            var link = createLinkButton(name, csv[0], onClick);
            listItem.appendChild(link);

            // Check if directory exists
            try { fs.statSync(csv[0]);}
            catch (err) {
              link.className = "project-not-found";
              link.disabled = true;
            }
            projectList.appendChild(listItem);
          }
          if (spinOnceLoaded) {
            //this.spin(items[0].split(",")[0]);
            api.notify({ type: 'spin', data: items[0].split(",")[0] });
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

CORE.createModule("spin-status", function(api) {
  var spinLogger;

  return {
    init : function() {
    	spinLogger = api.find("#last-spin-logger")[0];
      //api.listen({
        //'log-spin': this.logSpin
      //});
    },

    destroy : function() {
      api.ignore(['log-spin']);
    },

    logSpin : function(status) {
      spinLogger.innerHTML = status;
    }
  };
});

CORE.createModule("log-poker", function(api) {
  var logButton;

  return {
    init: function() {
      logButton = api.find("#log_button")[0];

      api.addEvent(logButton, "click", this.handleLogEntry);
    },

    destroy : function() {
      api.removeEvent(spinLogger, "click", this.handleLogEntry);
    },

    handleLogEntry : function() {
      api.notify({
        type: 'log-spin',
        data: 'Log entry message'
      });
    }
  };
});
