var gui = require('nw.gui');
var spawn = require('child_process').spawn;
var fs = require('fs');

var silk;
var openChildWnds = new Array();

var successCls = "success";
var errorCls = "error";
var silkReloadArg = "reload";

var silkPath = process.env.SILK_PATH;
if (silkPath == undefined) silkPath = process.env.HOME + "/.silk";

var silkGUIProjectList = silkPath + "/spun-projects.txt";

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
  var currentProject = document.getElementById('current-project');
  var msg = "";
  if (currentProject.value == "") {
    addLog("Please select a Silk Project.", errorCls);
    spin_btn.style.display = "";
    autospin_cbx.checked = false;
    return;
  }
  
  try { fs.statSync(currentProject.value);}
  catch (err) {
    addLog("Directory does not exists.", errorCls);
    spin_btn.style.display = "";
    autospin_cbx.checked = false;
    return;
  }
  
  if (arg == "") document.getElementById('autospin_cbx').checked = false;
  
  addLog("Spinning please wait", "");
  
  silk = spawn('silk', [arg], {cwd: currentProject.value}); 
  silk.stdout.on('data', function(data) {
    msg += data;
    if (msg.indexOf("Site spinning is complete") !== -1) {
      spinOutputlogger(currentProject.value, msg, true);
      for (i = 0; i < openChildWnds.length; i++) {
        openChildWnds[i][1].reload(); 
      }
      listProjects();
      msg = "";  // Clear spin msg for next Silk reload.
    } else if (msg.indexOf("Cause of error:") !== -1) {
      spinOutputlogger(currentProject.value, msg, false);
      msg = "";  // Clear spin msg for next Silk reload.
    }
  });
}

function loadLastProject() {
  document.getElementById('current-project-span').innerHTML = "Please a new project";
  setTimeout(function() { 
    changeProject(getSelectedRadioGroup("project").value);
  }, 100);
}

function changeProject(newProject) {
  document.getElementById('current-project').value = newProject;
  var name = getProjectNameFromPath(newProject);
  document.getElementById('current-project-span').innerHTML = name;
  removeChildElements(document.getElementById("last-spin-logger")); 
  if (document.getElementById('autospin_cbx').checked) {
    autospin(false); 
    autospin(true);
  }
}

function showProjectList(show) {
  var list = document.getElementById('project-list');
  if (show) list.style.display = 'block';
  else list.style.display = 'none';
}

function listProjects() {
  var list = document.getElementById('project-list');
  var grp = "project";
  removeChildElements(list);
  var recentProjectsBtn = document.getElementById("recent-projects-btn");
        
  fs.readFile(silkGUIProjectList, 'utf8', function (err, data) {
    if (err) { 
      recentProjectsBtn.style.display = 'none';
      return;
    }
    recentProjectsBtn.style.display = '';
    var items = data.split('\n');
    for (i = 0; i < items.length-1; i++) {
      var csv = items[i].split(",");
      var row = document.createElement('li');
      var tick = i == 0;
      var label = document.createElement('label');
      
      var radio = createRadio(grp + i, grp, csv[0], tick, 
        function() { changeProject(getSelectedRadioGroup(grp).value); }
      );
      
      var dirSpan = document.createElement('span');
      dirSpan.className = "spin-name";
      dirSpan.title = csv[0];
      dirSpan.innerHTML = getProjectNameFromPath(csv[0]); 
      
      var date = new Date(parseInt(csv[1]));
      var dateSpan = document.createElement('span');
      dateSpan.innerHTML = datetimeString(date);
      dateSpan.className = "spin-name";
      
      label.appendChild(radio);
      label.appendChild(dirSpan);
      label.appendChild(dateSpan);
      row.appendChild(label);
      list.appendChild(row);
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
  span.appendChild(document.createTextNode(datetimeString(new Date) + " - " + msg));
  logger.appendChild(span);
  
  logger.className = className
  return logger;
}

function spinOutputlogger(dir, msg, success) {
  if (success) {
    var logger = addLog("Successfully spun site", successCls);
    // Display in browser link.
    var openLink = createBtn("Show Site", "Previw Spin Link", function() { 
      openBrowserWindow(dir)
    });
    logger.appendChild(openLink);
  } else {
    var error = msg.substring(msg.indexOf("Cause of error:") + 16,  msg.length);
    addLog(error, errorCls);
  }
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
    height: 370,
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

function getProjectNameFromPath(path) {
  var index = path.lastIndexOf("/");
  if (index == -1) index = path.lastIndexOf("\\");
  return path.substring(index +1);
}

function removeChildElements(parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }
}

function getSelectedRadioGroup(name){
  var radio = document.getElementsByName(name);
  for (i=0; i < radio.length; i++) {
    if (radio[i].checked){
      return radio[i];
    }
  }
}

function createBtn(msg, title, onclick) {
  var btn = document.createElement('input');
  btn.type = "button";
  btn.value = msg;
  btn.onclick = onclick;
  return btn;
}

function createRadio(id, group, value, checked, onclick) {
  var radio = document.createElement("input");
  radio.type = "radio";
  radio.id = id;
  radio.name = group;
  radio.value = value;
  radio.checked = checked;
  radio.onclick = onclick;
  return radio;
}

function datetimeString(){
  var date = new Date();
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
