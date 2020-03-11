const {app, BrowserWindow, dialog, ipcMain, Menu} = require('electron')
const fs = require("fs")
let mainWindow
var url = ""
var valuess=""
var olf="";
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
ipcMain.on('synchronous-sendsave', (event, arg) => {
    valuess=arg // set
    olf=valuess
    event.returnValue = 'thanks'
})
ipcMain.on('synchronous-message', (event, arg) => {
    valuess=arg // set
    event.returnValue = 'saved'
})
ipcMain.on('synchronous-messageclick', (event, arg) => {
    sets=arg // set
    event.returnValue = 'thanks for data'
})
app.on('window-all-closed', function () {
  if(url!==""){
  
  		if(olf!=valuess){
  dialog.showMessageBox({type:"info",
  title: "Unsaved Data",
  message: "Will you save your Data?",
  buttons:["Yes", "No"]}, index=>{
    if(index===0){
fs.writeFile(url, valuess, (err) => {
  	 console.log("App Stopped, but we have saved your data :)")
     if (process.platform !== 'darwin') {
       app.quit()
     }
  })
  }else if(index===1){
    if (process.platform !== 'darwin') {
       app.quit()
     }
  }else{
    console.log("TRY TO LEAVE OPEN")
  }
  })}else{
  	if (process.platform !== 'darwin') {
       app.quit()
     }
  }

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
      fs.access(file, fs.constants.W_OK,(err)=>{
if(!err){
  url=file
      event.sender.send('asynchronous-reply', {"data":file, "num": 2})
}else{
  dialog.showMessageBox({type:"warning", 
  title: "SharkWrite ACCESS WARNING",
  message:"This Application don't have Permissions to write to the DIR "+file,
  buttons:["OK"]},inde=>{console.warn(inde)})
}
      });
      
    }
    }).catch(err=>console.log(err))
  }
  })
app.allowRendererProcessReuse=true
