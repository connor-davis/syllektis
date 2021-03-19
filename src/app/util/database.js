import PouchDB from 'pouchdb'

PouchDB.plugin(require('pouchdb-upsert'))

var database = new PouchDB('syllektis-database')

class Database {
    constructor() {
        this._interval = setInterval(() => {
            this.backup()
        }, 5 * 1000 * 60 * 60)
    }

    async init() {
        console.log('-----< Database Information >-----')
        console.log(await database.info())
        console.log('----------------------------------')

        database.replicate
            .from('http://41.133.116.6:5984/syllektis-database', {
                auth: {
                    username: 'syllektis',
                    password: window.POUCH_PASSWORD,
                },
            })
            .then(() => console.log('Database Replicated.'))
    }

    async add(doc, callback) {
        database
            .putIfNotExists(doc._id, doc)
            .then(async (res) => {
                let document = await this.get(res)
                callback(document)
            })
            .catch((error) => console.log(error))
    }

    async update(doc, callback) {
        database
            .upsert(doc._id, function (document) {
                return { ...document, ...doc }
            })
            .then(async (res) => {
                let document = await this.get(res)
                callback(document)
            })
            .catch((error) => console.log(error))
    }

    async get(doc) {
        let document = await database.get(doc.id)
        return document
    }

    async getAll(partition) {
        this._pageSize = 10
        this._offset = 0

        let documents = await database.allDocs({
            limit: this._pageSize,
            skip: this._offset,
        })

        let bulk = await database.bulkGet({
            revs: [
                ...documents.rows.map((row) => {
                    if (!row.value.deleted) return row.value.rev
                }),
            ],
            docs: [
                ...documents.rows.map((row) => {
                    if (
                        row.id !== undefined &&
                        row.id.split(':')[0] === partition
                    ) {
                        if (this._offset > documents.rows) this._offset = 0
                        this._offset += this._pageSize

                        return { id: row.id, rev: row.value.rev }
                    }
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
    }

    async remove(doc, callback) {
        database
            .remove(doc._id, doc._rev)
            .then(async (res) => {
                callback()
            })
            .catch((error) => console.log(error))
    }

    async backup(callback) {
        database.replicate
            .to('http://41.133.116.6:5984/syllektis-database', {
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
