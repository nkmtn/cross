const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Создаем окно браузера.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

// и загружаем index.html в приложении.
  win.loadFile('index.html')
  
  // Отображаем средства разработчика.
//   win.webContents.openDevTools()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.whenReady().then(createWindow) 
