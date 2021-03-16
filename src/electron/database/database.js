const HyperBee = require('hyperbee')
const HyperCore = require('hypercore');
const { toPromises } = require('hypercore-promisifier');

class Database {
    constructor() {
        this.core = toPromises(new HyperCore('./syllektis-database', {
            keyEncoding: 'utf-8',
            valueEncoding: 'utf-8',
        }))

        this.db = new HyperBee(this.core, {
            keyEncoding: 'utf-8',
            valueEncoding: 'utf-8',
        })

        this.init()
    }

    async init() {
        await this.db.ready()
    }

    async put({ key, value }) {
        await this.db.put(key, value)
    }

    async get({ key }) {
        return await this.db.get(key)
    }

    async delete({ key }) {
        await this.db.del(key)
    }
}

module.exports = { Database }
