const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    }
  });

  // Load the React build
  const startURL = `file://${path.join(__dirname, 'dist', 'index.html')}`;
  win.loadURL(startURL);
}

app.whenReady().then(createWindow);
