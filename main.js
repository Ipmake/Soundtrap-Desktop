// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const client = require('discord-rich-presence')('1026444157750882375');


function createWindow () {
  // Create the browser window.
  var mainWindow = new BrowserWindow({
    width: 1700,
    height: 1200,
    icon: path.join(__dirname, 'logo.png')
  })

  // and load the index.html of the app.
  mainWindow.loadURL('https://www.soundtrap.com/home')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  client.updatePresence({
    state: 'Home',
    details: 'by Spotify🎵',
    startTimestamp: Date.now(),
    largeImageKey: 'logo',
    instance: true,
  });
  
  setInterval(function() {
    var url = mainWindow.webContents.getURL()
    url = url.replace('https://www.soundtrap.com/', '');
    url = url.split('/')
  
    switch(url[0]) {
      case 'home': 
        client.updatePresence({
          state: 'Ideling',
          details: 'by Spotify🎵',
          largeImageKey: 'logo',
          instance: true,
        });
  
        break;
  
      case 'studio':
        const title = mainWindow.getTitle().split(' - ')

        client.updatePresence({
          state: 'Recording',
          details: title[0],
          largeImageKey: 'logo',
          instance: true,
        });

        break;
    }
  
  }, 5000)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

