import { app, BrowserWindow } from 'electron';
import { createTray } from './tray';
import * as path from 'path';
let tray = null
function createWindow () {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    autoHideMenuBar: true
  })

  const indexHTML = path.join(__dirname + '/index.html');
  win.loadFile(indexHTML)
}

app.setUserTasks([])

app.on('ready', () => {
  createWindow()
  tray = createTray()
  

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
      createTray()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
