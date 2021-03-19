import PouchDB from 'pouchdb'

PouchDB.plugin(require('pouchdb-upsert'))

var database = new PouchDB('syllektis-database')

class Database {
    constructor() {
        this.backup()

        this.init()

        this._interval = setInterval(() => {
            this.backup()
        }, 5 * 1000 * 60 * 60)
    }

    async init() {
        console.log('-----< Database Information >-----')
        console.log(await database.info())
        console.log('----------------------------------')

        database.replicate
            .from('http://197.83.253.81:5984/syllektis-database', {
                auth: {
                    username: 'syllektis',
                    password: window.POUCH_PASSWORD,
                },
            })
            .then(() => console.log('Database Replicated.'))
    }

    async add(doc, callback) {
        try {
            let document = await database.post(doc)
            callback(document)
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async update(doc, callback) {
        try {
            await database.upsert(doc._id, function (document) {
                return { ...document, ...doc }
            })
            callback(doc)
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async get(doc) {
        try {
            let document = await database.get(doc.id)
            return document
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getAll() {
        try {
            let documents = await database.allDocs({
                limit: 10,
                descending: false,
            })

            let bulk = await database.bulkGet({
                revs: [
                    ...documents.rows.map((row) => {
                        if (!row.value.deleted) return row.value.rev
                    }),
                ],
                docs: [
                    ...documents.rows.map((row) => {
                        if (!row.value.deleted)
                            return { id: row.id, rev: row.value.rev }
                    }),
                ],
            })

            return bulk.results.map((document) => {
                return {
                    ...document.docs.map((doc) => {
                        return doc.ok
                    })[0],
                }
            })
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async remove(doc, callback) {
        try {
            let document = await database.remove(doc)
            callback(document)
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async backup(callback) {
        database.replicate
            .to('http://197.83.253.81:5984/syllektis-database', {
                auth: {
                    username: 'syllektis',
                    password: window.POUCH_PASSWORD,
                },
            })
            .then(() => {
                if (callback) callback()
                console.log('Database Backed Up.')
            })
    }

    async close() {
        database.close().then(() => console.log('Database Closed.'))
    }
}

export default Database
