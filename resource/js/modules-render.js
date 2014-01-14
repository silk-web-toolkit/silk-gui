// loads templates into layout containers orchestrates our SPA
CORE.create_module("render", function(api) {

  return {
    init: function() {
      this.homeNoProjects();  

      api.listen({
        'log-spin' : this.logSpin 
      });
    },

    homeNoProjects : function() {
      api.loadTpl('left-panel', 'lp-home-nproj');
      api.loadTpl('right-panel', 'rp-home-nproj');

      var hello = {
        name:     'Schnickety Schnack',
        question: 'Do I look like a hovercraft pilot ?'
      };
      api.dataRender('question-panel', hello);
    },

    logSpin : function(status) {
      console.log("in log spin");
    },

    destroy : function() {
      
    }
  };
});