const { clipboard,ipcRenderer } = require('electron')
const fs=require("fs")
var url=""
const copyButton = document.querySelector('#copy')
const pasteButton = document.querySelector('#paste')
const textarea = document.querySelector('textarea')
const save = document.querySelector('#saveas')
const titless = document.querySelector('title')
const dds = document.querySelector('#ssd')
const assda = document.querySelector('#autosav')
assda.disabled=true
assda.checked=false
console.log(ipcRenderer.sendSync('synchronous-messageclick', assda.checked))
copyButton.onclick = () => {
  clipboard.writeText(textarea.value)
}
//////////////////////////////////////
// Async Reciever
ipcRenderer.on('asynchronous-reply', (...args) => {
  if(args[1].num==1){
  url=args[1].data
titless.innerText="SharkWrite - " + url
fs.readFile(url, "utf8", function(err, data) {
  textarea.value=data
  assda.disabled=false
  assda.checked=false
  console.log(ipcRenderer.sendSync('synchronous-messageclick', assda.checked))
})
}else{
  url=args[1].data
  fs.writeFile(url, textarea.value, (err) => {
       console.log("Complete")
       titless.innerText="SharkWrite - " + url
       assda.disabled=false
       assda.checked=false
       console.log(ipcRenderer.sendSync('synchronous-messageclick', assda.checked))
  })
}
})
////////////////////////////////////
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
  assda.disabled=true
  assda.checked=false
  console.log(ipcRenderer.sendSync('synchronous-messageclick', assda.checked))
}
var countdev=0;
textarea.onkeyup=()=>{
  if(assda.checked){
  	console.log(ipcRenderer.sendSync('synchronous-message', textarea.value))
    countdev++
    if(countdev>=6){
      countdev=0
      if(url!=""){
        fs.writeFile(url, textarea.value, (err) => {
           console.log("Complete")
        })
      }
    }
  }
}
assda.onclick=()=>{
	console.log(ipcRenderer.sendSync('synchronous-messageclick', assda.checked))
}