const SDK = require('hyper-sdk')
const HyperBee = require('hyperbee')

class Database {
    constructor() {
        this.init()
    }

    async init() {
        this._sdk = await SDK({
            persist: true,
            storage: null,
        })

        this._hypercore = this._sdk.Hypercore
        this._hyperdrive = this._sdk.Hyperdrive
        this._close = this._sdk.close

        this.drive = this._hyperdrive('syllektis-database')

        await this.drive.ready()

        this._url = `hyper://${this.drive.key.toString('hex')}`

        this.core = this._hypercore('syllektis-core', this.drive.key, {
            keyEncoding: 'utf-8',
            valueEncoding: 'utf-8',
        })
        this.bee = new HyperBee(this.core, {
            keyEncoding: 'utf-8',
            valueEncoding: 'utf-8',
        })
    }

    async put(key, value) {
        await this.bee.put(key, value)
    }

    async get(key) {
        return await this.bee.get(key)
    }

    async remove(key) {
        await this.bee.del(key)
    }
}

module.exports = { Database }
