var edn = require("jsedn");

function loadSourceModal(el) {
  var dir = el.getAttribute("data-id");
  document.querySelector("input#hidden_source_path").value = calculatePath(dir);
  document.querySelector("input#hidden_source_id").value = calculateName(dir);
  document.querySelector("input#source_id").value = calculateName(dir);
}

function saveSourceModal() {
  var dir = document.querySelector("input#hidden_source_path").value;
  var oldId = document.querySelector("input#hidden_source_id").value;
  var newId = document.querySelector("input#source_id").value;
  var path = dir + newId;

  if (oldId == newId) {}
  else if (oldId) fs.renameSync(oldId, newId);
  else if (!fs.existsSync(path)) fs.mkdirSync(path);
}

function deleteSourceModal() {
  var old = document.querySelector("input#hidden_source_path").value;
  deleteFolderRecursive(old);
}

function loadDataModal(el) {
  var file = el.getAttribute("data-id");
  if (fs.lstatSync(file).isDirectory()) {
    document.querySelector("input#hidden_data_path").value = file;
    document.querySelector("input#hidden_data_id").value = "";
    document.querySelector("input#data_id").value = "";
    tinyMCE.get('data_content').setContent("");
  } else {
    var data = fs.readFileSync(file, 'utf8');
    var map = edn.parse(data);
    var content = unescape(map.at(edn.kw(":content")));
    var name = removeExtension(calculateName(file));
    document.querySelector("input#hidden_data_path").value = calculatePath(file);
    document.querySelector("input#hidden_data_id").value = name;
    document.querySelector("input#data_id").value = name;
    tinyMCE.get('data_content').setContent(content);
  }
}

function saveDataModal() {
  var dir = document.querySelector("input#hidden_data_path").value;
  var oldId = document.querySelector("input#hidden_data_id").value;
  var newId = document.querySelector("input#data_id").value;
  var content = escape(tinyMCE.get('data_content').getContent());
  var ednString = "{ :content \"" + content + "\" }"
  fs.writeFileSync(dir + newId + ".edn", ednString);

  if (oldId && oldId !== newId) fs.unlinkSync(oldId + ".edn");
}

function deleteDataModal() {
  var old = document.querySelector("input#hidden_data_path").value;
  fs.unlinkSync(old);
}

function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
