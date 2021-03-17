export let initDB = async () => {
    if (window.database) {
        let { get, put } = window.database

        await put('test', 'Yessirrr')

        console.log(await get('test'))
    }
}
