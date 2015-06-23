var edn = require("jsedn"),
    gui = require('nw.gui'),
    spawn = require('child_process').spawn,
    io = require("./resource/js/io.js"),
    utils = require("./resource/js/utils.js");

var silk;
var openChildWnds = new Array();

window.onload=function(){
  var project = loadGUI();
  if (project) silkReload(project);
};

function loadGUI() {
  reloadWindowIfOpen();

  var silkPath = process.env.SILK_PATH;
  if (silkPath == undefined) silkPath = process.env.HOME + "/.silk";

  var data = io.read(silkPath + "/spun-projects.txt").split('\n');
  if (data) {
    displayProjects(data);
    var project = data[0].split(",")[0];
    displayCMS(project);
    return project;
  } else {
    addLog("Please add a Silk Project.", "info", "");
    return "";
  }
}

function silkReload(project) {
  var msg = "";

  if (silk) silk.kill("SIGHUP");

  if (!io.exists(project)) {
    addLog("Oh Snap! Directory does not exist.", "error", "");
    return;
  }

  silk = spawn('silk', ["spin -a"], {cwd: project});
  silk.stdout.on('data', function(data) {
    msg += data;
    addLog("Spinning, please wait ...", "info", "");

    if (msg.indexOf("SUCCESS:") !== -1) {
      addLog("Congratulations, your site was successfully spun!", "success", project)
      loadGUI();
      msg = "";
    } else if (msg.indexOf("CAUSE:") !== -1 && msg.indexOf("Press enter to exit") !== -1) {
      var error = msg.substring(msg.indexOf("CAUSE:") + 14,  msg.lastIndexOf("Press enter to exit") - 4);
      addLog("Oh Snap! " + error, "error", "");
      msg = "";
    }
  });
}

function displayProjects(items) {
  var list = document.getElementById('projectList');
  utils.removeChildElements(list);

  for (i = 0; i < items.length-1; i++) {
    var template = document.querySelector("template#projectListRow").content;
    var row = template.cloneNode(true);
    var csv = items[i].split(",");

    if (i > 0) row.querySelector("li").className = "";

    var link = row.querySelector("a");
    link.title = csv[0]; // Also a way to pass value onclick.
    link.onclick = function() { silkReload(this.title); };

    row.querySelector(".spun-project").textContent = utils.calculateName(csv[0]);
    row.querySelector(".spun-time").textContent = utils.prettyDate(new Date(parseInt(csv[1])));

    if (!io.exists(csv[0])) {
      link.className = "project-not-found";
      link.disabled = true;
    }
    list.appendChild(row);
  }
  return;
}

function displayCMS(project) {
  var root = project + "/data/"
  var source = document.querySelector("#source");
  utils.removeChildElements(source);

  var sourceHeader = document.querySelector("template#sourceHeader").content;
  sourceHeader.querySelector("button").setAttribute("data-id", root);
  source.appendChild(sourceHeader.cloneNode(true));

  if (io.exists(root)) {
    var dirs = io.readDir(root);
    for (var i = 0; i < dirs.length; ++i) {
      var path = root + dirs[i];

      if (io.isDirectory(path)) {
        var files = io.readDir(path);
        var sourceRow = document.querySelector("template#sourceRow").content;
        var sourceModalLink = sourceRow.querySelector("a");
        sourceModalLink.textContent = dirs[i];
        sourceModalLink.setAttribute("data-id", path);
        sourceRow.querySelector("span").textContent = files.length;
        sourceRow.querySelector("div div").setAttribute("data-target", "#collapse" + i);
        sourceRow.querySelector("div.collapse").id = "collapse" + i;
        sourceRow.querySelector("button").setAttribute("data-id", path + "/");
        var data = sourceRow.querySelector("ul.nav");
        utils.removeChildElements(data);

        for (var x = 0; x < files.length; ++x) {
          var dataRow = document.querySelector("template#dataRow").content;
          var dataModalLink = dataRow.querySelector("a");
          dataModalLink.textContent = utils.removeExtension(files[x]);
          dataModalLink.setAttribute("data-id", path + "/" + files[x]);
          data.appendChild(dataRow.cloneNode(true));
        }
        source.appendChild(sourceRow.cloneNode(true));
      }
    }
    // Load first one
    var col = document.querySelector("div.collapse");
    if (col !== null) col.className += " in";
  }
}

function addLog(msg, logType, project) {
  var logger = document.querySelector("#logger");
  utils.removeChildElements(logger);

  if (logType === "success") {
    var template = document.querySelector("template#successLog").content;
    template.querySelector("button").setAttribute("data-id", project);
  } else if (logType === "error") {
    var template = document.querySelector("template#errorLog").content;
  } else if (logType === "info") {
    var template = document.querySelector("template#infoLog").content;
  }

  template.querySelector('span').innerHTML = msg;
  logger.appendChild(template.cloneNode(true));
}

function loadSourceModal(el) {
  var dir = el.getAttribute("data-id");
  document.querySelector("input#hidden_source_path").value = utils.calculatePath(dir);
  document.querySelector("input#hidden_source_name").value = utils.calculateName(dir);
  document.querySelector("input#source_name").value = utils.calculateName(dir);
}

function saveSourceModal() {
  var dir = document.querySelector("input#hidden_source_path").value;
  var oldId = document.querySelector("input#hidden_source_name").value;
  var newId = document.querySelector("input#source_name").value;
  var path = dir + newId;

  if (oldId == newId) {}
  else if (oldId) io.rename(dir + oldId, path);
  else if (!io.exists(path)) io.mkdirs(path);

  loadGUI();
}

function deleteSourceModal() {
  var dir = document.querySelector("input#hidden_source_path").value;
  var oldId = document.querySelector("input#hidden_source_name").value;
  io.delete(dir + oldId);

  loadGUI();
}

function loadDataModal(el) {
  var file = el.getAttribute("data-id");
  var path = name = title = author = summary = body = "";

  if (io.isDirectory(file)) {
    path = file;
  } else {
    path = utils.calculatePath(file);
    name = utils.removeExtension(utils.calculateName(file));
    var map = edn.parse(io.read(file, "utf8"));
    title = getEdnValue(map, ":title");
    author = getEdnValue(map, ":author");
    summary = unescape(getEdnValue(map, ":summary-html"));
    body = unescape(getEdnValue(map, ":body-html"));
  }

  document.getElementById("hidden_data_path").value = path;
  document.getElementById("hidden_data_name").value = name;
  document.getElementById("data_name").value = name;
  document.getElementById("data_title").value = title;
  document.getElementById("data_author").value = author;
  tinyMCE.get("data_summary_html").setContent(summary);
  tinyMCE.get("data_body_html").setContent(body);
}

function getEdnValue(k, v) {
  try { return k.at(edn.kw(v)) }
  catch (err) { return "" }
}

function saveDataModal() {
  var dir = document.getElementById("hidden_data_path").value;
  var oldId = document.getElementById("hidden_data_name").value;
  var newId = document.getElementById("data_name").value;
  var title = document.getElementById("data_title").value;
  var summary = escape(tinyMCE.get("data_summary_html").getContent());
  var body = escape(tinyMCE.get("data_body_html").getContent());
  var author = document.getElementById("data_author").value;
  var ednString = "{ :title \"" + title + "\" :summary-html \"" + summary + "\" :body-html \"" + body + "\" :author \"" + author + "\" }"
  io.save(dir + newId + ".edn", ednString);

  if (oldId && oldId !== newId) io.delete(dir + oldId + ".edn");
}

function deleteDataModal() {
  var dir = document.querySelector("input#hidden_data_path").value;
  var oldId = document.querySelector("input#hidden_data_name").value;
  io.delete(dir + oldId  + ".edn");
}

function reloadWindowIfOpen() {
  for (i = 0; i < openChildWnds.length; i++) {
    openChildWnds[i][1].reload();
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
