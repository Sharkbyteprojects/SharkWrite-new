// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { clipboard,ipcRenderer } = require('electron')
const fs=require("fs")
var url=""
const copyButton = document.querySelector('#copy')
const pasteButton = document.querySelector('#paste')
const textarea = document.querySelector('textarea')
const save = document.querySelector('#saveas')
const titless = document.querySelector('title')
const dds = document.querySelector('#ssd')
copyButton.onclick = () => {
  clipboard.writeText(textarea.value)
}
////////////////////////////////////////
ipcRenderer.on('asynchronous-reply', (...args) => {
  if(args[1].num==1){
  url=args[1].data
titless.innerText="SharkWrite - " + url
fs.readFile(url, "utf8", function(err, data) {
  textarea.value=data;
});}else{
  url=args[1].data
  fs.writeFile(url, textarea.value, (err) => {
       console.log("Complete")
       titless.innerText="SharkWrite - " + url
  })
}
})
pasteButton.onclick = () => {
  ipcRenderer.send('asynchronous-message', 'getima');
}
save.onclick=()=>{
  if(url!=""){
    fs.writeFile(url, textarea.value, (err) => {
       console.log("Complete")
    })
  }else{
    ipcRenderer.send('asynchronous-message', 'sets');
  }
}
dds.onclick=()=>{
  textarea.value="";
  titless.innerText="SharkWrite"
  url="";
}