import PouchDB from 'pouchdb'
import { setLoading } from './slices/loading.slice'
import store from './store'

PouchDB.plugin(require('pouchdb-upsert'))

var database = new PouchDB('syllektis-database')

class Database {
    constructor() {
        this._interval = setInterval(() => {
            this.backup().then(() => {
                console.log('Database Sync Complete.')
            })
        }, 5 * 1000 * 60)
    }

    async init() {
        console.log('-----< Database Information >-----')
        console.log(await database.info())
        console.log('----------------------------------')

        store.dispatch(setLoading(true))

        database.sync(
            'http://syllektis.connordavis.tech:5984/syllektis-database',
            {
                auth: {
                    username: 'syllektis',
                    password: window.POUCH_PASSWORD,
                },
            }
        )
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
            startkey: partition,
            endkey: `${partition}\ufff0`,
        })

        let bulk = await database.bulkGet({
            revs: [
                ...documents.rows.map((row) => {
                    if (!row.value.deleted) return row.value.rev
                }),
            ],
            docs: [
                ...documents.rows.map((row) => {
                    if (!row.value.deleted) {
                        if (this._offset > documents.rows) this._offset = 0
                        this._offset += this._pageSize

                        return { id: row.id, rev: row.value.rev }
                    }
                }),
            ],
        })

        let data = bulk.results.map((document) => {
            return {
                ...document.docs.map((doc) => {
                    return doc.ok
                })[0],
            }
        })

        return data
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
        database.sync(
            'http://syllektis.connordavis.tech:5984/syllektis-database',
            {
                auth: {
                    username: 'syllektis',
                    password: window.POUCH_PASSWORD,
                },
            }
        )
    }

    async close() {
        database.close().then(() => console.log('Database Closed.'))
    }
}

export default Database
