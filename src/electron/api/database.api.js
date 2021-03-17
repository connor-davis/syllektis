const dbAPI = (ipcMain, database) => {
    ipcMain.on('API_db-put', async (event, { key, value }) => {
        await database.put({ key, value })

        event.reply('API_db-put-success')
    })

    ipcMain.on('API_db-get', async (event, { key }) => {
        let value = await database.get({ key })

        if (value) event.reply('API_db-get-success', { key, value })
        else event.reply('API_db-get-failure', { key })
    })
}

module.exports = { dbAPI }
