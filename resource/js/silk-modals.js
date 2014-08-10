var edn = require("jsedn");

function loadSourceModal(el) {
  var dir = el.getAttribute("data-id");
  document.querySelector("input#hidden_source_id").value = dir;
  document.querySelector("input#source_name").value = dir;
}

function loadDataModal(el) {
  var file = el.getAttribute("data-id");
  var data = fs.readFileSync(file, 'utf8');
  var map = edn.parse(data);
  var content = unescape(map.at(edn.kw(":content")));
  document.querySelector("input#hidden_data_id").value = file;
  document.querySelector("input#data_name").value = file;
  tinyMCE.get('data_content').setContent(content)
}

function saveSourceModal(){
  var path = document.querySelector("input#source_name").value;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

function deleteSourceModal(){
  var old = document.querySelector("input#hidden_source_id").value;
  deleteFolderRecursive(old);
}

function saveDataModal(){
  var path = document.querySelector("input#data_name").value;
  var content = escape(tinyMCE.get('data_content').getContent());
  var ednString = "{ :content \"" + content + "\" }"
  fs.writeFileSync(path, ednString);
}

function deleteDataModal(){
  var old = document.querySelector("input#hidden_data_id").value;
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
};
