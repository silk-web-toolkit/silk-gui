/******************************************************************************
orchestrates our SPA

loads templates into layout containers
******************************************************************************/


/*****************************************************************************
  app launch - the entry point of the app

  at this point no events have occurred so we need to figure out which screen
  to display
******************************************************************************/
CORE.createModule("app-launch", function(api) {

  return {
    bootstrap : function() { },

    create: function() {
      var data;
      try {
        data = fs.readFileSync(api.getProjectList(), 'utf8');
      } catch (err) {
        data = null;
      }
      if (defined(data)) {
        api.notify({ type: 'projects-list', data: data });
        api.notify({ type: 'spin-status', data: "Spinning your project..." });
      } else {
        api.notify({ type: 'project-choose', data: '' });
      }
    },

    destroy : function() { }
  };
});


/******************************************************************************
  project chooser - choose a project and initiate a spin

  will trigger projects-list refresh
******************************************************************************/
CORE.createModule("project-chooser", function(api) {
  var projectChooserInput;

  return {
    bootstrap : function() {
      api.listen({ 'project-choose' : this.projectChoose });
      // TODO: this needs to be here atm, otherwise the dom event is not hooked or registered properly
      api.loadTpl('right-panel', 'project-chooser-tpl');
      projectChooserInput = api.find("#project-chooser-input")[0];
      api.addEvent(projectChooserInput, "change", this.handleProjectChooserChange);
      // TODO: this is yucky, but necessary until we unpick the dom event reg issue
      $("#project-chooser").fadeTo(0,0);
    },

    create : function() { },

    projectChoose : function() {
      // TODO: this is yucky, but necessary until we unpick the dom event reg issue
      $("#project-chooser").fadeTo(0,1);
    },

    handleProjectChooserChange : function() {
      info("handling project choose change");
      //console.log(projectChoice);
    },

    destroy : function() { }
  };
});


/*****************************************************************************
  projects list - reusable interactive list of projects

  displays project name and enables click to spin
******************************************************************************/
CORE.createModule("projects-list", function(api) {

  function parseCSV(str) {
    return _.reduce(str.split("\n"), function(table, row) {
      table.push(_.map(row.split(","), function(c) { return c.trim()}));
      return table;
    }, []);
  };

  function getProjectName(path) {
    var index = path.lastIndexOf("/");
    if (index == -1) index = path.lastIndexOf("\\");
    return path.substring(index +1);
  }

  function getProjectPaths(csv) { return _.map(csv, _.first); }

  function getProjectNames(csv) {
    return _.map(csv, function(item) {
      return getProjectName(_.first(item));
    });
  }

  function labelProject(pair) {
    return { "path" : pair[0], "name" :  pair[1] };
  }

  function silkProjectsData(csv) {
    return _.map(_.zip(getProjectPaths(csv), getProjectNames(csv)), labelProject);
  }

  return {
    bootstrap: function() {
      api.listen({
        'projects-list' : this.projectsList
      });
    },

    create: function() { },

    projectsList : function(payload) {
      api.loadTpl('left-panel', 'projects-list-tpl');
      var csv = parseCSV(payload);
      api.inject('#projects', silkProjectsData(_.initial(csv)), {});
      api.notify({ type: 'spin', data: _.first(getProjectPaths(csv)) });
    },

    destroy : function() { }
  };
});

CORE.createModule("spin", function(api) {
  var spawn = require('child_process').spawn;

  var silkProcess;
  var SILK_RELOAD = "reload";

  return {
    bootstrap: function () {
      api.listen ({
        'spin' : this.spin
      });
    },

    create: function () {},

    spin : function(project) {
      var msg = "";

      try { fs.statSync(project);}
      catch (err) {
        api.notify({ type: 'spin-status', data: 'Oh Snap! Directory does not exist.' });
        return;
      }

      try { silkProcess.kill("SIGHUP"); }
      catch (err) { }

      api.notify({ type: 'spin-status', data: 'Spinning, please wait...' });

      silkProcess = spawn('silk', [SILK_RELOAD], {cwd: project});
      silkProcess.stdout.on('data', function(data) {
        msg += data;
        if (msg.indexOf("Site spinning is complete") !== -1) {
          console.log("SPIN yay");
          api.notify({ type: 'spin-status', data: 'Congratulations, your site was successfully spun!' });
          msg = "";
        } else if (msg.indexOf("Cause of error:") !== -1) {
          api.notify({ type: 'spin-status', data: 'Oh Snap! ' + error });
          msg = "";
        }
      });
    },

    destroy: function () {}
  };
});

/******************************************************************************
  spin status - show the status of a spin

  let the user know when we are starting a spin, and what the reuslts are
******************************************************************************/
CORE.createModule("spin-status", function(api) {

  return {
    bootstrap : function() {
      api.listen({ 'spin-status' : this.spinStatus });
    },

    create : function() {

    },

    spinStatus : function(payload) {
      api.loadTpl('right-panel', 'spin-status-tpl');
      api.inject('#spin-status', {status: payload }, {});
    },

    destroy : function() { }
  };
});
