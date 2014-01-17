/******************************************************************************
orchestrates our SPA

loads templates into layout containers
******************************************************************************/


/****************************************************************************** 
  app launch - the entry point of the app

  at this point no events have occurred so we need to figure out which screen
  to display
******************************************************************************/
CORE.createModule("app-launch", function(api) {

  return {
    bootstrap : function() { },

    create: function() {
      this.homeNoProjects();
    },

    homeNoProjects : function() {
      var data;
      try {
        data = fs.readFileSync(api.getProjectList(), 'utf8');
      } catch (err) {
        data = null;
      }
      if (defined(data)) {
        api.notify({ type: 'projects-list', data: data });
        api.notify({ type: 'spin-status-start', data: data });
      } else {
        api.notify({ type: 'project-choose', data: data });
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
      api.loadTpl('right-panel', 'project-chooser');
      projectChooserInput = api.find("#project-chooser-input")[0];
      api.addEvent(projectChooserInput, "change", this.handleProjectChooserChange);
      $("#project-chooser").fadeTo(0,0);
    },

    create : function() { 
      
    },

    projectChoose : function() {
      debug("in projectChoose");
      $("#project-chooser").fadeTo(0,1);
    },

    handleProjectChooserChange : function() {
      info("handling project choose change");
      //console.log(projectChoice);
    },

    destroy : function() { }
  };
});


/****************************************************************************** 
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

  function getProjectPaths(csv) { return _.map(csv, _.first); }

  function getProjectName(path) {
    var index = path.lastIndexOf("/");
    if (index == -1) index = path.lastIndexOf("\\");
    return path.substring(index +1);
  }

  return {
    bootstrap: function() {
      api.listen({
        'projects-list' : this.projectsList
      });
    },

    create: function() { },

    projectsList : function(payload) {
      api.loadTpl('left-panel', 'projects-list');

      var directives = {
        project: {
          text:  function(params) { return getProjectName(this.value); },
          title: function(params) { return this.value; }
        }
      };

      api.inject('#projects', getProjectPaths(_.initial(parseCSV(payload))), directives);
    },

    destroy : function() { }
  };
});


/****************************************************************************** 
  spin status - show the status of a spin

  let the use know when we are starting a spin, and what the reuslts are
******************************************************************************/
CORE.createModule("spin-status", function(api) {

  return {
    bootstrap : function() {
      api.listen({ 'spin-status-start' : this.spinStatusStart });
      //api.listen({ 'spin-status-end' : this.spinStatusEnd });
    },

    create : function() { },

    spinStatusStart : function() {
      api.loadTpl('right-panel', 'spin-status');
      api.inject('#spin-status', {status: 'Your project is spinning...' }, {});
    },

    /*spinStatusEnd : function(status) { },*/

    destroy : function() { }
  };
});
