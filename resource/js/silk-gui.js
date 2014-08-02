var gui = require('nw.gui');
var spawn = require('child_process').spawn;
var fs = require('fs');

var silk;
var openChildWnds = new Array();

var infoCls = "alert alert-info";
var successCls = "alert alert-success";
var errorCls = "alert alert-danger";
var silkReloadArg = "reload";

var silkPath = process.env.SILK_PATH;
if (silkPath == undefined) silkPath = process.env.HOME + "/.silk";

var silkGUIProjectList = silkPath + "/spun-projects.txt";

function spin(project) {
  var msg = "";

  try { fs.statSync(project);}
  catch (err) {
    addLog("Oh Snap! Directory does not exists.", errorCls);
    return;
  }

  try { silk.kill("SIGHUP"); }
  catch (err) { }

  addLog("Spinning, please wait ...", infoCls);

  silk = spawn('silk', [silkReloadArg], {cwd: project});
  silk.stdout.on('data', function(data) {
    msg += data;
    if (msg.indexOf("Site spinning is complete") !== -1) {
      spinOutputlogger(project, msg, true);
      for (i = 0; i < openChildWnds.length; i++) {
        openChildWnds[i][1].reload();
      }
      listAndDisplayProjects(spinOnceLoaded = false);
      msg = "";  // Clear spin msg for next Silk reload.
    } else if (msg.indexOf("Cause of error:") !== -1) {
      spinOutputlogger(project, msg, false);
      msg = "";  // Clear spin msg for next Silk reload.
    }
  });
}

function listAndDisplayProjects(spinOnceLoaded) {
  fs.readFile(silkGUIProjectList, 'utf8', function (err, data) {
    var list = document.getElementById('project-list');
    removeChildElements(list);
    try {
      var items = data.split('\n');
      if (items.length == 0) {
        addLog("Please add a Silk Project.", infoCls)
        return;
      }
      for (i = 0; i < items.length-1; i++) {
        var active = "";
        if (i == 0)  active = "active";
        var listItem = createListItem(active);

        var csv = items[i].split(",");
        var name = getProjectNameFromPath(csv[0]);
        var onClick = function() { spin(this.title);};
        var link = createLink(name, csv[0], onClick);
        listItem.appendChild(link);

        // Check if directory exists
        try { fs.statSync(csv[0]);}
        catch (err) {
          link.className = "project-not-found";
          link.disabled = true;
        }
        list.appendChild(listItem);
      }
      if (spinOnceLoaded) {
        spin(items[0].split(",")[0]);
      }
    } catch (err) {
      addLog("Please add a Silk Project.", infoCls);
    }
  });
}

function addLog(msg, className) {
  var logger = document.getElementById("last-spin-logger");
  removeChildElements(logger);
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(msg));
  div.className = className;
  logger.appendChild(div);
  return logger;
}

function spinOutputlogger(dir, msg, success) {
  if (success) {
    var logger = addLog("Congratulations, your site was successfully spun!", successCls);
    // Display in browser link.
    var openLink = createBtn("View your project", "Preview Spin Link", "btn btn-success", function() {
      openBrowserWindow(dir)
    });
    logger.appendChild(openLink);
  } else {
    var error = msg.substring(msg.indexOf("Cause of error:") + 16,  msg.length);
    addLog("Oh Snap! " + error, errorCls);
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

function createBtn(msg, title, cls, onclick) {
  var btn = document.createElement('button');
  btn.type = "button";
  btn.innerHTML = msg;
  btn.className= cls;
  btn.onclick = onclick;
  return btn;
}

function createListItem(cls) {
  var listItem = document.createElement("li");
  listItem.className = cls;
  return listItem;
}

function createLink(name, title, onclick) {
  var link = document.createElement("a");
  link.href = "#";
  link.innerHTML = name;
  link.title = title;
  link.onclick = onclick;
  return link;
}

function datetimeString(){
  var date = new Date();
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
