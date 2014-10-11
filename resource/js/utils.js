exports.calculatePath = function (str) {
  var index = str.lastIndexOf("/");
  if (index == -1) index = str.lastIndexOf("\\");
  return str.substring(0, index + 1);
};

exports.calculateName = function (str) {
  var index = str.lastIndexOf("/");
  if (index == -1) index = str.lastIndexOf("\\");
  return str.substring(index + 1);
};

exports.removeExtension = function (str) {
  return str.substring(0, str.lastIndexOf("."));
};

exports.removeChildElements = function (parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }
};

exports.prettyDate = function (date) {
  var diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

  return day_diff == 0 && (diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
};
