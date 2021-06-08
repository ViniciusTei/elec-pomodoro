import { app, BrowserWindow, Menu, Tray, nativeImage } from 'electron'
import * as path from 'path';

function createWindow () {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    autoHideMenuBar: true
  })
  const indexHTML = path.join(__dirname + '/index.html');
  win.loadFile(indexHTML)
}
/** Icones suportatos apenas PNG e JPEG
 * Ícone pequeno
    16x16 (com escala de DPI com 100%)
    20x20 (com escala de DPI com 125%)
    24x24 (com escala de DPI com 150%)
    32x32 (com escala de DPI com 200%)
  Ícone grande
    32x32 (com escala de DPI com 100%)
    40x40 (com escala de DPI com 150%)
    48x48 (com escala de DPI com 150%)
    64x64 (com escala de DPI com 200%)
    256x256
 */

// function setTray() {
//   let tray = null
//   const image_path = path.join(__dirname,'assets/tomate.png')
//   const image = nativeImage.createFromPath(image_path);
//   image.setTemplateImage(true)
//   tray = new Tray(image)
//   const contextMenu = Menu.buildFromTemplate([
//     { label: 'Item1', type: 'radio' },
//     { label: 'Item2', type: 'radio' },
//     { label: 'Item3', type: 'radio', checked: true },
//     { label: 'Item4', type: 'radio' }
//   ])
//   tray.setToolTip('This is my application.')
//   tray.setContextMenu(contextMenu)
//   return tray
// }

app.on('ready', () => {
  // const tray = setTray() 
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
