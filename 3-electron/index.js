const {app, dialog, ipcMain, BrowserWindow, Menu} = require('electron')
const fs = require('fs');
const path = require('path');

function createWindow() {
    // Создаем окно браузера.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            minimumFontSize: 16,
            defaultFontSize: 16,
            defaultMonospaceFontSize: 16
        }
    })

    // win.webContents.openDevTools();

    ipcMain.on('save', (event, arg) => {
        console.log(arg)
        try {
            JSON.parse(arg)
        } catch (e) {
            if (e instanceof SyntaxError) {
                dialog.showErrorBox("Ошибка","Кривой JSON")
            }
            return
        }

        dialog.showSaveDialog({

        }).then(result => {
            if (result.canceled) {
                return
            }
            fs.writeFileSync(result.filePath, arg)
        })
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
                            properties: ['openFile'],
                            filters: [
                                { name: 'Файлы JSON', extensions: ['json'] },
                                { name: 'Все файлы', extensions: ['*'] }
                            ]
                        }).then(result => {
                            console.log(result.canceled)
                            console.log(result.filePaths)
                            let data = fs.readFileSync(path.resolve(__dirname, result.filePaths[0])).toString();
                            win.webContents.send('open', data)

                        }).catch(err => {
                            console.log(err)
                        })
                    },
                    accelerator: 'CmdOrCtrl+O'
                },
                {
                    label: 'Open URL...',
                    click() {
                        win.webContents.send('open_url')
                    },
                    accelerator: 'CmdOrCtrl+L'
                },
                {
                    label: 'Save...',
                    click() {
                        win.webContents.send('save')
                    },
                    accelerator: 'CmdOrCtrl+S'
                },
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

    win.loadFile('index.html')
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(createWindow)
