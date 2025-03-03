import { app, BrowserWindow, ipcMain, IpcMainEvent,screen } from 'electron';
import {User,checkUser} from './utilisateur';
import path from 'path';
/*
https://rpcache-aa.meteofrance.com/internet2018client/2.0/observation/gridded?lat=47.747832&lon=7.337901&id=682240

Bearer eyJjbGFzcyI6ImludGVybmV0IiwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJkYTMxNGY4ZTJkZTY0MmM4MDU1NTBiZjBmYTNlZmQxMiIsImlhdCI6MTc0MDg0NzQ2N30.VDt9VdJ7yk-0DMK38D3lKhEiIwwBFvpT30cHLsOL2-M

*/
let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    resizable: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, '../../public/asset/image/icon/favico.ico'),
    title: 'Projet Stock Collocation',
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'), // Chemin vers le preload
      contextIsolation: true, // Sécurité : isolement du contexte
      nodeIntegration: false, // Sécurité : désactive l'intégration de Node.js dans le renderer
      devTools: false, // Ouvre les outils de développement
    },
  });

  // Charge le fichier HTML
  mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));
}

app.on('ready', () => {

  console.log(screen.getAllDisplays())

  ipcMain.handle("connect-user", checkUser);

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});