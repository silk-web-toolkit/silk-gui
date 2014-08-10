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

function getSelectedRadioGroup(name) {
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

function datetimeString() {
  var date = new Date();
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
