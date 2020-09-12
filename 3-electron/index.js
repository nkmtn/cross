const { app, dialog, BrowserWindow, Menu } = require('electron')

function createWindow () {
  // Создаем окно браузера.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Open...',
          click() {
            dialog.showOpenDialog({
              title: 'Выберите файл в формате JSON',
              properties: ['openFile']
            }).then(result => {
              console.log(result.canceled)
            })
          },
          accelerator: 'CmdOrCtrl+O'
        },
        {
          label: 'Save...',
          accelerator: 'CmdOrCtrl+S'
        },
        {type:'separator'},
        {
          label: 'Quit',
          click() {
            app.quit()
          },
          accelerator: 'CmdOrCtrl+Q'
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

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
