var gui = require('nw.gui');

function spin(arg) {  
  var chooser = document.getElementById('chooser');
  if (chooser.value == "") {
    alert("You did not select a directory to spin.");
    document.getElementById('spin_btn').style.display = "";
    document.getElementById('autospin_off').checked = "checked";
    return;
  }
  
  var spawn = require('child_process').spawn;
  var silk = spawn('silk', [arg], {cwd: chooser.value});
  var msg = "";
  silk.stdout.on('data', function(data) {
    // TO-DO add a shinny spinner.
    msg += data;
  });
  
  silk.on('exit', function(code) {
    spinOutputContainer(chooser.value, msg)
  });
}

function spinOutputContainer(dir, msg) {
  var container = document.getElementById("stack-logger");
  var div = document.createElement("div");
  // Stack divs.
  if (container.hasChildNodes()) container.appendChild(div)
  else container.insertBefore(div, container.firstChild);
  // Spin output.
  
  var span = document.createElement("span");
  span.appendChild(document.createTextNode(timenow()));
  div.appendChild(span);
  
  if (msg.indexOf("Site spinning is complete") !== -1) {
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

function autospin(radio) {
  var btn = document.getElementById('spin_btn');
  if (radio == 'y') {
    btn.style.display = "none";
    spin("reload");
  } else {
    btn.style.display = "";
  }
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
