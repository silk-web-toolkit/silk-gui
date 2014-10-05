function calculatePath(str) {
  var index = str.lastIndexOf("/");
  if (index == -1) index = str.lastIndexOf("\\");
  return str.substring(0, index + 1);
}

function calculateName(str) {
  var index = str.lastIndexOf("/");
  if (index == -1) index = str.lastIndexOf("\\");
  return str.substring(index + 1);
}

function removeExtension(str) {
  return str.substring(0, str.lastIndexOf("."));
}

function removeChildElements(parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
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

function prettyDate(date) {
  var diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

  return day_diff == 0 && (diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
}

function datetimeString() {
  var date = new Date();
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
