import { Tray, nativeImage } from 'electron';
import { BrowserWindow } from 'electron/main';
import * as path from 'path';

export function createTray(win: BrowserWindow) {
    const image_path = path.resolve(__dirname, '../', 'assets', 'tomate-icon.png')
    const tray = new Tray(nativeImage.createFromPath(image_path))
    tray.on('click', () => {
      win.show()
    })
    return tray
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