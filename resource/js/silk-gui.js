var spawn = require('child_process').spawn;

var silk;
var infoCls = "alert alert-info";
var successCls = "alert alert-success";
var errorCls = "alert alert-danger";
var silkReloadArg = "reload";
var exitMessage = "Press enter to exit"

var silkPath = process.env.SILK_PATH;
if (silkPath == undefined) silkPath = process.env.HOME + "/.silk";

var silkGUIProjectList = silkPath + "/spun-projects.txt";

var data = listProjects();
if (data) {
  displayProjects(data);
  silkReload(data[0].split(",")[0]);
} else {
  addLog("Please add a Silk Project.", infoCls);
}

tinymce.init({
  selector: "textarea",
  plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table contextmenu paste"],
  toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
  height : "200"
});

$(document).on('focusin', function(e) {
  if ($(event.target).closest(".mce-window").length) {
    e.stopImmediatePropagation();
  }
});

function silkReload(project) {
  var msg = "";

  if (silk) silk.kill("SIGHUP");

  try {
    fs.statSync(project);
  } catch (err) {
    addLog("Oh Snap! Directory does not exist.", errorCls);
    return;
  }

  silk = spawn('silk', [silkReloadArg], {cwd: project});

  silk.stdout.on('data', function(data) {
    msg += data;

    addLog("Spinning, please wait ...", infoCls);

    if (msg.indexOf("SUCCESS:") !== -1) {
      var logger = addLog("Congratulations, your site was successfully spun!", successCls);
      // Display in browser link.
      var openLink = createBtn("View", "Preview Spin Link", "btn btn-success", function() {
        openBrowserWindow(project)
      });
      logger.lastChild.appendChild(openLink);

      reloadWindowIfOpen();
      displayProjects(listProjects());
      displayDataCRUD(project);

      msg = "";
    } else if (msg.indexOf("CAUSE:") !== -1 && msg.indexOf(exitMessage) !== -1) {
      var error = msg.substring(msg.indexOf("CAUSE:") + 14,  msg.lastIndexOf(exitMessage) - 4);
      addLog("Oh Snap! " + error, errorCls);
      msg = "";
    }
  });
}

function listProjects() {
  try {
    return fs.readFileSync(silkGUIProjectList, 'utf8').split('\n');
  } catch (err) {
    return null;
  }
}

function displayProjects(items) {
  var list = document.getElementById('project-list');
  removeChildElements(list);

  for (i = 0; i < items.length-1; i++) {
    var active = "";
    if (i == 0)  active = "active";
    var listItem = createListItem(active);
    var csv = items[i].split(",");
    var name = calculateName(csv[0]);
    var onClick = function() { silkReload(this.title);};
    var link = createLink(name, csv[0], onClick);
    var msg = document.createElement("span");
    msg.innerHTML = prettyDate(new Date(parseInt(csv[1])));
    msg.className = "spun-time";
    link.appendChild(msg);
    listItem.appendChild(link);

    try { fs.statSync(csv[0]);}
    catch (err) {
      link.className = "project-not-found";
      link.disabled = true;
    }
    list.appendChild(listItem);
  }
  return;
}

function displayDataCRUD(project) {
  var root = project + "/data/"
  var source = document.querySelector("#source");
  removeChildElements(source);

  var sourceHeader = document.querySelector("template#sourceHeader").content;
  sourceHeader.querySelector("button").setAttribute("data-id", root);
  source.appendChild(sourceHeader.cloneNode(true));

  if (fs.existsSync(root)) {
    var dirs = fs.readdirSync(root);
    for (var i = 0; i < dirs.length; ++i) {
      var path = root + dirs[i];

      if (fs.lstatSync(path).isDirectory()) {
        var files = fs.readdirSync(path);
        var sourceRow = document.querySelector("template#sourceRow").content;
        var sourceModalLink = sourceRow.querySelector("a");
        sourceModalLink.textContent = dirs[i];
        sourceModalLink.setAttribute("data-id", path);
        sourceRow.querySelector("span").textContent = files.length;
        sourceRow.querySelector("div div").setAttribute("data-target", "#collapse" + i);
        sourceRow.querySelector("div.collapse").id = "collapse" + i;
        sourceRow.querySelector("button").setAttribute("data-id", path + "/");
        var data = sourceRow.querySelector("ul.nav");
        removeChildElements(data);

        for (var x = 0; x < files.length; ++x) {
          var dataRow = document.querySelector("template#dataRow").content;
          var dataModalLink = dataRow.querySelector("a");
          dataModalLink.textContent = removeExtension(files[x]);
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

function addLog(msg, className) {
  var logger = document.getElementById("last-spin-logger");
  removeChildElements(logger);
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(msg));
  div.className = className;
  logger.appendChild(div);
  return logger;
}
