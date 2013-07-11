var gui = require('nw.gui');
var spawn = require('child_process').spawn;

var silk;

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
    alert("You did not select a directory to spin.");
    spin_btn.style.display = "";
    autospin_cbx.checked = false;
    return;
  }
  
  if (arg == "") document.getElementById('autospin_cbx').checked = false;
  
  silk = spawn('silk', [arg], {cwd: chooser.value});
  silk.stdout.on('data', function(data) {
    msg += data;
    if (msg.indexOf("Site spinning is complete") !== -1) {
      spinOutputlogger(true, chooser.value, msg);      
    } else if (msg.indexOf("Cause Of error:") !== -1) {
      spinOutputlogger(false, chooser.value, msg);
    }
  });
}

function spinOutputlogger(success, dir, msg) {
  var logger = document.getElementById("last-spin-logger");
  var div = document.createElement("div");
  
  if (logger.hasChildNodes()) logger.replaceChild(div, logger.firstChild)
  else logger.appendChild(div);
  
  var span = document.createElement("span");
  span.appendChild(document.createTextNode(timenow()));
  div.appendChild(span);
  
  if (success) {
    div.className = "success";
    // Display in browser link.
    var openLink = document.createElement('a');
    openLink.appendChild(document.createTextNode("Display in Browser"));
    openLink.title = "Preview Spin Link";
    openLink.href = "#";
    openLink.onclick=function() { 
      openBrowserWindow(dir + "/site/index.html")
    }
    div.appendChild(openLink);
  } else {
    div.className = "error";
    // See error link.
    var errorLink = document.createElement('a');
    errorLink.appendChild(document.createTextNode("Show error message"));
    errorLink.title = "See Spin Error Link";
    errorLink.href = "#";
    errorLink.onclick=function() { 
      alert(msg.substring(msg.indexOf("Cause Of error:"),  msg.length))
    }
    div.appendChild(errorLink);
  }
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
    ampm= 'am',
    h= now.getHours(),
    m= now.getMinutes(),
    s= now.getSeconds();
    if(h>= 12){
        if(h>12)h-= 12;
        ampm= 'pm';
    }
    if(h<10) h= '0'+h;
    if(m<10) m= '0'+m;
    if(s<10) s= '0'+s;
    return now.toLocaleDateString()+' '+h+':'+m+':'+s+' '+ampm;
}
