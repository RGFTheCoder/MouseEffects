'use strict'

var electron = require('electron');
var app = electron.app;
var BrowserWindow = require('electron').BrowserWindow;

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        alwaysOnTop: true,
        height: 600,
        width: 800,
        frame: false,
        transparent: true
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    mainWindow.setIgnoreMouseEvents(true, { forward: true });
    mainWindow.setContentProtection(true);
    mainWindow.maximize();
    mainWindow.setAlwaysOnTop(true, "floating");
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.setFullScreenable(false);

});

var ipc = require('electron').ipcMain;

ipc.on('get-mouse-pos', function(event, arg) {
    event.sender.send("setMousePos", electron.screen.getCursorScreenPoint());

    // screen.getCursorScreenPoint();
});