// loads templates into layout containers orchestrates our SPA
CORE.createModule("render", function(api) {

  return {
    init: function() {
      this.homeNoProjects();

      api.listen({
        'test-payload': this.testNotification()
      });  
    },

    homeNoProjects : function() {
      api.loadTpl('left-panel', 'lp-home-nproj');
      api.loadTpl('right-panel', 'rp-home-nproj');

      var hello = {
        name:     'Schnickety Schnack',
        question: 'Do I look like a hovercraft pilot ?'
      };
      api.inject('question-panel', hello);
    },

    testNotification : function(status) {
      console.log("meh");
      alert("flibble");
    },

    destroy : function() {
      
    }
  };
});