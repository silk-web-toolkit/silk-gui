var spawn = require('child_process').spawn;
var fs = require('fs');

var silk;
var infoCls = "alert alert-info";
var successCls = "alert alert-success";
var errorCls = "alert alert-danger";
var silkReloadArg = "reload";
var exitMessage = "Press enter to exit"

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
    if (msg.indexOf("SUCCESS:") !== -1) {
      spinOutputlogger(project, msg, true);
      reloadWindowIfOpen();
      listAndDisplayProjects(spinOnceLoaded = false);
      displayDataCRUD(project);
      msg = "";  // Clear spin msg for next Silk reload.
    } else if (msg.indexOf("CAUSE:") !== -1 && msg.indexOf(exitMessage) !== -1) {
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
        var name = getNameFromPath(csv[0]);
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

function displayDataCRUD(project) {
  var source = document.querySelector("#source");
  removeChildElements(source);
  var dirs = fs.readdirSync(project + "/data");

  for (var i = 0; i < dirs.length; ++i) {
    var path = project + "/data/" + dirs[i];

    if (fs.lstatSync(path).isDirectory()) {
      var files = fs.readdirSync(path);
      var sourceRow = document.querySelector("template#sourceRow").content;
      var sourceModalLink = sourceRow.querySelector("a")
      sourceModalLink.textContent = dirs[i];
      sourceModalLink.setAttribute("data-id", path);
      sourceRow.querySelector("span").textContent = files.length;
      sourceRow.querySelector("div div").setAttribute("data-target", "#collapse" + i);
      sourceRow.querySelector("div.collapse").id = "collapse" + i;

      var data = sourceRow.querySelector("div.list-group");
      removeChildElements(data);

      for (var x = 0; x < files.length; ++x) {
        var dataRow = document.querySelector("template#dataRow").content;
        var dataModalLink = dataRow.querySelector("a");
        dataModalLink.textContent = files[x];
        dataModalLink.setAttribute("data-id", path + "/" + files[x]);
        data.appendChild(dataRow.cloneNode(true));
      }
      source.appendChild(sourceRow.cloneNode(true));
    }
  }
  // Load first one
  var col = document.querySelector("div.collapse");
  if (col !== undefined) col.className += " in";
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
    var openLink = createBtn("View", "Preview Spin Link", "btn btn-success", function() {
      openBrowserWindow(dir)
    });
    logger.lastChild.appendChild(openLink);
  } else {
    // Also removes ASCII color values.
    var error = msg.substring(msg.indexOf("CAUSE:") + 14,  msg.lastIndexOf(exitMessage) - 4);
    addLog("Oh Snap! " + error, errorCls);
  }
}
