var gui = require('nw.gui');
var openChildWnds = new Array();

function reloadWindowIfOpen() {
  for (i = 0; i < openChildWnds.length; i++) {
    openChildWnds[i][1].reload();
  }
}

function openBrowserWindow(site) {
  createNewWindow("file:///" + site + "/site/", {
    show: true,
    title: 'Silk Spin Preview',
    toolbar: true,
    width: 1000,
    height: 800
  });
}

function indexOfTitleInOpenChildWindows(title) {
  var index = -1;

  for (i = 0; i < openChildWnds.length; i++) {
    if (openChildWnds[i][0] == title) {
      index = i;
    }
  }
  return index;
}

function createNewWindow(url, settings) {
  var index = indexOfTitleInOpenChildWindows(settings.title);
  if (index > -1) {
      openChildWnds[index][1].focus();
  } else {
    var new_win = gui.Window.open(url, settings);
    openChildWnds.push([settings.title, new_win]);

    new_win.on('closed', function() {
      openChildWnds.splice(indexOfTitleInOpenChildWindows(settings.title), 1);
    });

    // Listen to main window's close event
    gui.Window.get().on('close', function() {
      gui.App.quit();
    });
  }
}
