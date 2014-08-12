var edn = require("jsedn");
var fs = require("fs-extra");

function loadSourceModal(el) {
  var dir = el.getAttribute("data-id");
  document.querySelector("input#hidden_source_path").value = calculatePath(dir);
  document.querySelector("input#hidden_source_name").value = calculateName(dir);
  document.querySelector("input#source_name").value = calculateName(dir);
}

function saveSourceModal() {
  var dir = document.querySelector("input#hidden_source_path").value;
  var oldId = document.querySelector("input#hidden_source_name").value;
  var newId = document.querySelector("input#source_name").value;
  var path = dir + newId;

  if (oldId == newId) {}
  else if (oldId) fs.renameSync(oldId, newId);
  else if (!fs.existsSync(path)) fs.mkdirsSync(path);
}

function deleteSourceModal() {
  var dir = document.querySelector("input#hidden_source_path").value;
  var oldId = document.querySelector("input#hidden_source_name").value;
  fs.deleteSync(dir + oldId);
}

function loadDataModal(el) {
  var file = el.getAttribute("data-id");
  if (fs.lstatSync(file).isDirectory()) {
    document.getElementById("hidden_data_path").value = file;
    document.getElementById("hidden_data_name").value = "";
    document.getElementById("data_name").value = "";
    tinyMCE.get("data_body_html").setContent("");
  } else {
    var data = fs.readFileSync(file, "utf8");
    var name = removeExtension(calculateName(file));
    var map = edn.parse(data);
    var title = getEdnValue(map, ":title");
    var summary = unescape(getEdnValue(map, ":summary-html"));
    var body = unescape(getEdnValue(map, ":body-html"));
    var author = getEdnValue(map, ":author");
    document.getElementById("hidden_data_name").value = name;
    document.getElementById("data_name").value = name;
    document.getElementById("hidden_data_path").value = calculatePath(file);
    document.getElementById("data_title").value = title;
    document.getElementById("data_author").value = author;
    tinyMCE.get("data_summary_html").setContent(summary);
    tinyMCE.get("data_body_html").setContent(body);
  }
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
  fs.writeFileSync(dir + newId + ".edn", ednString);

  if (oldId && oldId !== newId) fs.unlinkSync(dir + oldId + ".edn");
}

function deleteDataModal() {
  var dir = document.querySelector("input#hidden_data_path").value;
  var oldId = document.querySelector("input#hidden_data_name").value;
  fs.deleteSync(dir + oldId  + ".edn");
}
