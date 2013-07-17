var gui = require('nw.gui');
var spawn = require('child_process').spawn;
var fs = require('fs');

var silk;
var openChildWnds = new Array();

var successCls = "success";
var errorCls = "error";
var silkReloadArg = "reload";

var silkGUILastSpunProjectFile = "../silk-gui-last-spun-project.txt"

function autospin(checked) {
  if (checked) {
    spin_btn.style.display = "none";
    spin(silkReloadArg);
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
      setLastSpunDirectory(chooser.value); 
    } else if (msg.indexOf("Cause of error:") !== -1) {
      spinOutputlogger(chooser.value, msg, false);
    }
  });
}

function setLastSpunDirectory(dir) {
  fs.writeFile(silkGUILastSpunProjectFile, dir, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
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
      openBrowserWindow(dir)
    }
    logger.appendChild(openLink);
  } else {
    var logger = addLog("Error spinning site", errorCls);
    // See error link.
    var errorLink = createLink("Show Error", "See Spin Error Link");
    errorLink.onclick=function() { 
      alert(msg.substring(msg.indexOf("Cause of error:") + 16,  msg.length));
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
  createNewWindow("file:///" + site + "/site/", {
    show: true,
    title: 'Silk Spin Preview',
    toolbar: true,
    width: 1000,
    height: 800
  });
}

function aboutUs() {
  createNewWindow("about-us.html", {
    show: true,
    title: 'About Us',
    toolbar: false,
    width: 600,
    height: 350,
    position: "center"
  });
}

function indexOfTitleInOpenChildWindows(title) {
  var index = -1;
  
  for (i = 0; i < openChildWnds.length; i++) {
    if (openChildWnds[i][0] == title) {
      index = i;
    }
  }
  return index;
}

function createNewWindow(url, settings) {
  var index = indexOfTitleInOpenChildWindows(settings.title);
  if (index > -1) {
      openChildWnds[index][1].focus();
  } else {
    var new_win = gui.Window.open(url, settings);   
    openChildWnds.push([settings.title, new_win]);
    
    new_win.on('closed', function() {
      openChildWnds.splice(indexOfTitleInOpenChildWindows(settings.title), 1);
    });
    
    // Listen to main window's close event
    gui.Window.get().on('close', function() {
      gui.App.quit();
    });
  }
}

function timenow(){
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  if (h > 12) h -= 12;
  if (h < 10) h = '0'+h;
  if (m < 10) m = '0'+m;
  if (s < 10) s = '0'+s;
  return now.toLocaleDateString()+' '+h+':'+m+':'+s;
}
