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
    } ,

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
      console.log("init spin status");
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
