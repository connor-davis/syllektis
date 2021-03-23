const { app, BrowserWindow, ipcMain } = require('electron')
const log = require('electron-log')
const { autoUpdater } = require('electron-updater')

const path = require('path')
const url = require('url')

let mainWindow, updateDialog, updateChangeStatus, updateFinish

const { main } = require('electron-dialogs')

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'Syllektis Desktop',
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: true, // turn off remote
            preload: path.join(__dirname, 'preload.js'), // use a preload script
        },
        show: false,
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

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    updateDialog = main(mainWindow, 'app-updates')

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

//-------------------------------------------------------------------
// Auto updates
//-------------------------------------------------------------------

autoUpdater.on('checking-for-update', () => {
    log.info('checking for update')
})

autoUpdater.on('update-available', (info) => {
    log.info('update available')
    updateDialog.confirm(
        {
            title: 'Update Available',
            message:
                'There is an update available for this application. Would you like to download it?',
            confirmText: 'Yes',
            cancelText: 'Cancel',
        },
        (res) => {
            if (!res.canceled) {
                autoUpdater.downloadUpdate()

                const { changeStatus, finish } = dialogs.progress({
                    title: 'Downloading Update',
                    message: 'Please be patient while we download your update.',
                    autoClose: false,
                    changeableBar: true,
                })

                updateChangeStatus = changeStatus
                updateFinish = finish
            }
        }
    )
})

autoUpdater.on('update-not-available', (info) => {
    log.info('update not available')
})

autoUpdater.on('error', (err) => {
    log.info('update error')
})

autoUpdater.on('download-progress', (progressObj) => {
    updateChangeStatus({ message: '', percentage: 10 })
    updateFinish('Update Finished')
})

autoUpdater.on('update-downloaded', (info) => {
    log.info('update downloaded')
    setTimeout(() => {
        autoUpdater.quitAndInstall()
    }, 500)
})
