const {app, BrowserWindow} = require('electron')
const path = require('path');
const fs = require('fs');
const checksum = require('checksum');
const axios = require('axios');

const RPC = require('discord-rich-presence');
const { fstat } = require('fs');
const client = RPC('1046884861358645268')

// check if cache.json exists
if (!fs.existsSync('./cache.json')) {
  fs.writeFileSync('./cache.json', "{}")
}

var cache = JSON.parse(fs.readFileSync('./cache.json', 'utf8'))



function createWindow () {
  // Create the browser window.
  var mainWindow = new BrowserWindow({
    width: 1700,
    height: 1200,
    autoHideMenuBar: true,
    icon: "./logo.png"
  })

  // and load the index.html of the app.
  mainWindow.loadURL('https://app.plex.tv')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  setInterval(async () => {

    // get the window title
    var title = mainWindow.getTitle();
    var playing = title.includes("▶")
    title = title.replace("▶ ", "")

    playArtits = title.split(" - ")[0]
    playTitle = title.split(" - ")[1]
    playTitle = playTitle.replace("·", "-")

    // get the element with the classes "MetadataPosterCardFace-face-FcNn6A MetadataPosterCardFace-poster-MwJE1t MetadataPosterCardFace-faceFront-h7AIDh"
    var image = await mainWindow.webContents.executeJavaScript(fs.readFileSync("./test.js", 'utf8'))


    //convert the image to base64
    var base64Image = image.replace(/^data:image\/png;base64,/, "");
    updateCache(base64Image)

    // client.updatePresence({
    //   state: 'sasddas',
    //   details: 'sdsasdadsa',
      
    //   largeImageKey: base64Image
    // })

    console.log(playArtits)
    console.log(playTitle)




  }, 2000)
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

function updateCache(image) {
  const cs = checksum(image)
  if(cache[cs]){
    return cache[cs]
  }

  axios.post('https://discord.com/api/webhooks/1046904644179349634/i5vJBe8u3BZO2SZpeUGy5FP2oEbJHVSZzpX-lIhQCx3orHk2IGlQLImaWbP-rSYE_kYg', {
    embeds: [
      {
        image: {
          url: image
        }
      }
    ]
  }).then(res => {
    console.log(res.data)
    cache[cs] = res.data.id
    fs.writeFileSync('./cache.json', JSON.stringify(cache))
  }).catch(err => {
    console.log(err)
  })
}