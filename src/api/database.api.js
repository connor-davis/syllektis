const dbAPI = (ipcMain, database) => {
    ipcMain.on('API_db-put', async (event, { key, value }) => {
        await database.put({ key, value })
        event.reply('API_db-put-success')
        console.log('PUT>>>', { key, value })
    })

    ipcMain.on('API_db-get', async (event, { key }) => {
        let value = await database.get({ key })
        event.reply('API_db-get-success', { key, value })
    })
}

module.exports = { dbAPI }
