'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');
const fs = require('fs');

var config = {};
try {
  //test to see if settings exist
  var path = './config.json'
  fs.openSync(path, 'r+'); //throws error if file doesn't exist
  var data=fs.readFileSync(path); //file exists, get the contents
  config = JSON.parse(data); //turn to js object
} catch (err) {
  throw err;
}

var mainWindow = null;

app.on('window-all-closed', function() {
  if( process.platform != 'darwin'){
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width:1200, height:600});
  //mainWindow.process.config = config;
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  if(config.debug){
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
