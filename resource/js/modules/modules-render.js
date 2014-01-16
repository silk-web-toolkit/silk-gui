/******************************************************************************
orchestrates our SPA

loads templates into layout containers
******************************************************************************/

CORE.createModule("render", function(api) {
  var projectChooser;
  var silkPath = process.env.SILK_PATH;
  if (silkPath == undefined) silkPath = process.env.HOME + "/.silk";
  var PROJECT_LIST = silkPath + "/spun-projects.txt";
  var projectList;

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
    init: function() {
      this.homeNoProjects();  

      api.listen({
        'log-spin' : this.logSpin 
      });
    },

    homeNoProjects : function() {
      var data;
      try {
        data = fs.readFileSync(PROJECT_LIST, 'utf8');
      } catch (err) {
        data = null;
      }
      if (defined(data)) {
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
      console.log("handling project choose change");
      //console.log(projectChoice);
    },

    logSpin : function(status) {
      console.log("in log spin");
    },

    destroy : function() {
      
    }
  };
});
