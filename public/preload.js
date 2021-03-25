const { contextBridge, ipcRenderer } = require('electron')
const dialogs = require('electron-dialogs')

function callIpcRenderer(method, channel, ...args) {
    if (typeof channel !== 'string' || !channel.startsWith('API_')) {
        throw 'Error: IPC channel name not allowed'
    }

    if (['invoke', 'send'].includes(method)) {
        return ipcRenderer[method](channel, ...args)
    }

    if ('on' === method) {
        const listener = args[0]
        if (!listener) throw 'Listener must be provided'

        const wrappedListener = (_event, ...a) => listener(...a)
        ipcRenderer.on(channel, wrappedListener)

        return () => {
            ipcRenderer.removeListener(channel, wrappedListener)
        }
    }
}

contextBridge.exposeInMainWorld('ipcRenderer', {
    invoke: (...args) => callIpcRenderer('invoke', ...args),
    send: (...args) => callIpcRenderer('send', ...args),
    on: (...args) => callIpcRenderer('on', ...args),
})

dialogs.renderer('app-updates')

contextBridge.exposeInMainWorld('POUCH_PASSWORD', process.env.POUCH_PASSWORD)
