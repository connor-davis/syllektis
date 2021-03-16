const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const url = require('url')

const { Database } = require('./electron/database/database')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'Syllektis',
        darkTheme: true,
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, 'preload.js'), // use a preload script
        },
    })

    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true,
            hash: '#',
        })

    mainWindow.loadURL(startUrl)

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

let database = new Database()

require('./electron/api/database.api').dbAPI(ipcMain, database)
