// loads templates into layout containers orchestrates our SPA
CORE.createModule("render", function(api) {
  var projectChooser;
  fs = require('fs');
  var silkPath = process.env.SILK_PATH;
  if (silkPath == undefined) silkPath = process.env.HOME + "/.silk";
  var PROJECT_LIST = silkPath + "/spun-projects.txt";
  var projectList;

  function parseCSV(str) {
    return _.reduce(str.split("\n"), function(table, row) {
    table.push(_.map(row.split(","), function(c) { return c.trim()}));
    return table; }, []);
  };

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
        info("data is : " + data);
        api.loadTpl('left-panel', 'lp-home-proj');
        api.loadTpl('right-panel', 'rp-home-proj');
        //debugObject(data);
        var csv = parseCSV(data);
        info("csv is : " + csv);
        info(_.rest(csv).sort());
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