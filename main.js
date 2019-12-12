const {app, BrowserWindow, dialog, ipcMain, Menu} = require('electron')
const fs = require("fs")
let mainWindow
var url = ""
var valuess=""
var sets=false
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')
  Menu.setApplicationMenu(null)
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)
ipcMain.on('synchronous-message', (event, arg) => {
    valuess=arg // set
    event.returnValue = 'thanks'
})
ipcMain.on('synchronous-messageclick', (event, arg) => {
    sets=arg // set
    event.returnValue = 'thanks for data'
})
app.on('window-all-closed', function () {
  if(sets){
  fs.writeFile(url, valuess, (err) => {
     if (process.platform !== 'darwin') {
       app.quit()
     }
  })
}else{
  if (process.platform !== 'darwin') {
       app.quit()
   }
}
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
  ipcMain.on('asynchronous-message', (event, arg) => {
    if(arg=="getima"){
    dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  }).then(result => {
    if (result.canceled) {
      console.log('Dialog was canceled')
    } else {
      const file = result.filePaths[0]
      url=file
      event.sender.send('asynchronous-reply', {"data":file, "num": 1})
    }
  }).catch(err => {
    console.log(err)
  })}else{
    dialog.showSaveDialog(mainWindow, {
      properties: ["saveFile"]
    }).then(result=>{
      if (result.canceled) {
      console.log('Dialog was canceled')
    } else {
      console.log(result)
      const file = result.filePath
      url=file
      event.sender.send('asynchronous-reply', {"data":file, "num": 2})
    }
    }).catch(err=>console.log(err))
  }
  })
app.allowRendererProcessReuse=true
