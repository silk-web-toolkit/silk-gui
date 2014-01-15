// loads templates into layout containers orchestrates our SPA
CORE.createModule("render", function(api) {
  var projectChooser;
  fs = require('fs');
  var silkPath = process.env.SILK_PATH;
  if (silkPath == undefined) silkPath = process.env.HOME + "/.silk";
  var PROJECT_LIST = silkPath + "/spun-projects.txt";
  var projectList;

  return {
    init: function() {
      this.homeNoProjects();  

      api.listen({
        'log-spin' : this.logSpin 
      });
    },

    homeNoProjects : function() {
      console.log("PROJECT_LIST is : " + PROJECT_LIST);
      var data;
      try {
        data = fs.readFileSync(PROJECT_LIST);
      } catch (err) {
        data = null;
      }
      console.log("data is : " + data);
      if (data != null) {
        api.loadTpl('left-panel', 'lp-home-proj');
        api.loadTpl('right-panel', 'rp-home-proj'); 
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