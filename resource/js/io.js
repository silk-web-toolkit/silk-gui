var fs = require("fs-extra");

exports.read = function (path) {
  try { return fs.readFileSync(path, 'utf8'); }
  catch (err) { return null; }
};

exports.readDir = function (path) {
  return fs.readdirSync(path);
};

exports.save = function (path, content) {
  fs.writeFileSync(path, content);
};

exports.prependContent = function (path, content) {
  fs.writeFileSync(path, content);
};

exports.exists = function (path) {
  return fs.existsSync(path);
};

exports.isDirectory = function (path) {
  return fs.lstatSync(path).isDirectory();
};

exports.mkdirs = function (path) {
  fs.mkdirsSync(path);
};

exports.delete = function (path) {
  fs.deleteSync(path);
};

exports.rename = function (path1, path2) {
  fs.renameSync(path1, path2);
};
