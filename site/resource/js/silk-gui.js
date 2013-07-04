function spin(arg) {  
  var chooser = document.getElementById('chooser');
  if (chooser.value == "") {
    alert("You did not select a directory to spin.");
    document.getElementById('spin_btn').style.display = "";
    document.getElementById('autospin_off').checked = "checked";
    return;
  }
  
  var spawn = require('child_process').spawn
    , silk = spawn('silk', [arg], {cwd: chooser.value});

  silk.stdout.on('data', function(data) {
    var logger = document.getElementById("logger");
    logger.value += data;
    logger.scrollTop = logger.scrollHeight;
  });

  silk.on('exit', function(code) {
    console.log('Child process exited with code:', code);
  });


/*
  var exec = require('child_process').exec;

  exec('silk' +arg, {cwd: chooser.value}, function(err, stdout, stderr) {
    if (err) { //process error
      console.log("error is " + err);
      alert("error is " + err);
    } else { 
      console.log("success open");
      var logger = document.getElementById("logger");
      logger.value += stdout;
      logger.scrollTop = logger.scrollHeight;
    }
  })
  */
}

function autospin(radio) {
  var btn = document.getElementById('spin_btn');
  if (radio == 'y') {
    btn.style.display = "none";
    spin("reload");
  } else {
    btn.style.display = "";
  }
}
