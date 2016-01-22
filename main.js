'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('window-all-closed', function() {
  if( process.platform != 'darwin'){
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width:1200, height:600});

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
