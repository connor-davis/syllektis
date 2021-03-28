const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater')

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'Syllektis Desktop',
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true,
            hash: '#',
        })

    mainWindow.loadURL(startUrl)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    autoUpdater.checkForUpdates()
}

app.on('ready', () => {
    createWindow()
})

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

//--------------//
// Auto updates //
//--------------//

autoUpdater.on('checking-for-update', () => { })

autoUpdater.on('update-available', (info) => {
    autoUpdater.downloadUpdate()
})

autoUpdater.on('update-not-available', (info) => { })

autoUpdater.on('error', (err) => { })

autoUpdater.on('download-progress', (progressObj) => { })

autoUpdater.on('update-downloaded', (info) => {
    setTimeout(() => {
        autoUpdater.quitAndInstall()
    }, 500)
})
