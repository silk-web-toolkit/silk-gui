/******************************************************************************
orchestrates our SPA

loads templates into layout containers
******************************************************************************/

/* app launch - the entry point of the app

   at this point no events have occurred so we need to figure out which screen
   to display
******************************************************************************/
CORE.createModule("app-launch", function(api) {
  var projectChooser;

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
    bootstrap : function() {
      api.listen({
        'log-spin' : this.logSpin 
      });
    },

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
        api.notify({ type: 'projects-list', data: 'blurb' });

        api.loadTpl('left-panel', 'lp-home-proj');
        api.loadTpl('right-panel', 'rp-home-proj');

        var directives = {
          project: {
            text:  function(params) { return getProjectName(this.value); },
            title: function(params) { return this.value; }
          }
       };

        api.inject('#projects', getProjectPaths(_.initial(parseCSV(data))), directives);
      } else {
        api.loadTpl('left-panel', 'lp-home-nproj');
        api.loadTpl('right-panel', 'rp-home-nproj');
        projectChooser = api.find("#project-chooser")[0];
        api.addEvent(projectChooser, "change", this.handleProjectChooserChange);
      }
    },

    handleProjectChooserChange : function() {
      info("handling project choose change");
      //console.log(projectChoice);
    },

    logSpin : function(status) {
      info("in log spin");
    },

    destroy : function() {
      
    }
  };
});

CORE.createModule("projects-list", function(api) {

  return {
    bootstrap: function() {
      api.listen({
        'projects-list' : this.projectsList
      });
    },

    create: function() { },

    projectsList : function(status) {
      debug("in projects list function");
    },

    destroy : function() { }
  };
});
