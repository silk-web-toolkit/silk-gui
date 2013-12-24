window.onfocus = function() { 
  console.log("focus");
  focusTitlebars(true);
}

window.onblur = function() { 
  console.log("blur");
  focusTitlebars(false);
}

window.onresize = function() {
  updateContentStyle();
}

window.onload = function() {
  addTitlebar("top-titlebar", "resource/image/top-titlebar.png", "");
  focusTitlebars(true);
  updateContentStyle();
  require("nw.gui").Window.get().show();
}
