var gui = require('nw.gui');
var spawn = require('child_process').spawn;
var silk;
var successCls = "success";
var errorCls = "error";

function autospin(checked) {
  if (checked) {
    spin_btn.style.display = "none";
    spin("reload");
  } else {
    spin_btn.style.display = "";
    try { silk.kill("SIGHUP"); } 
    catch (err) { }
  }
}

function spin(arg) {  
  var spin_btn = document.getElementById('spin_btn');
  var chooser = document.getElementById('chooser');
  var msg = "";
  
  if (chooser.value == "") {
    addLog("Please select a Silk Project.", errorCls);
    spin_btn.style.display = "";
    autospin_cbx.checked = false;
    return;
  }
  
  if (arg == "") document.getElementById('autospin_cbx').checked = false;
  
  addLog("Spinning please wait", "");
  
  silk = spawn('silk', [arg], {cwd: chooser.value});
  silk.stdout.on('data', function(data) {
    msg += data;
    if (msg.indexOf("Site spinning is complete") !== -1) {
      spinOutputlogger(chooser.value, msg, true);      
    } else if (msg.indexOf("Cause of error:") !== -1) {
      spinOutputlogger(chooser.value, msg, false);
    }
  });
}

function addLog(msg, className) {
  var container = document.getElementById("last-spin-logger");
  var logger = document.createElement("div");
  
  if (container.hasChildNodes()) 
    container.replaceChild(logger, container.firstChild)
  else container.appendChild(logger);
  
  var span = document.createElement("span");
  span.appendChild(document.createTextNode(timenow() + " - " + msg));
  logger.appendChild(span);
  
  logger.className = className
  return logger;
}

function spinOutputlogger(dir, msg, success) {
  if (success) {
    var logger = addLog("Successfully spun site", successCls);
    // Display in browser link.
    var openLink = createLink("Show Site", "Previw Spin Link");
    openLink.onclick=function() { 
      openBrowserWindow(dir + "/site/index.html")
    }
    logger.appendChild(openLink);
  } else {
    var logger = addLog("Error spinning site", errorCls);
    // See error link.
    var errorLink = createLink("Show Error", "See Spin Error Link");
    errorLink.onclick=function() { 
      alert(msg.substring(msg.indexOf("Cause of error:") + 16,  msg.length))
    }
    logger.appendChild(errorLink);
  }
}

function createLink(msg, title) {
  var a = document.createElement('a');
  a.appendChild(document.createTextNode(msg));
  a.title = "Preview Spin Link";
  a.href = "#";
  return a;
}

function openBrowserWindow(site) {
  var win = gui.Window.open("file:///" + site, {
    show: true,
    'new-instance': true,
    title: 'Silk Spin Preview',
    toolbar: true,
    width: 800,
    height: 600
  });
  
  win.on('closed', function() {
    win = null;
  });
  
  // Listen to main window's close event
  gui.Window.get().on('close', function() {
    gui.App.quit();
  });
}

function timenow(){
    var now= new Date(),
    h= now.getHours(),
    m= now.getMinutes(),
    s= now.getSeconds();
    if(h>= 12){
      if(h>12)h-= 12;
    }
    if(h<10) h= '0'+h;
    if(m<10) m= '0'+m;
    if(s<10) s= '0'+s;
    return now.toLocaleDateString()+' '+h+':'+m+':'+s;
}
