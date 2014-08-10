
function loadSourceModal(el) {
  var dir = el.getAttribute("data-id");
  document.querySelector("input#source_name").value = getProjectNameFromPath(dir);
}

function loadDataModal(el) {
  var file = el.getAttribute("data-id");
  document.querySelector("input#data_name").value = getProjectNameFromPath(file);
  var data = fs.readFileSync(file, 'utf8');
  alert(data);
}

function saveSourceModal(){}

function saveDataModal(){
  alert(tinyMCE.get('data_content').getContent());
  var content = escape(tinyMCE.get('data_content').getContent());
  alert(content);
  var ednString = "{ :title \"Blank Template\" :details \"" + content + "\" :image \"resource/img/blank-template.png\" :zip \"resource/blank-template.zip\" }"
  fs.writeFile("/home/nick/workspace/mine/silk/silk-site/data/example-projects/example4.edn", ednString, function(err) {
    if(err) {
      alert("error");
    }
  });
}
