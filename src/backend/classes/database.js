require('dotenv').config()

const sqlite3 = require('sqlite3').verbose()

class Database {
    constructor() {
        this.db = new sqlite3.Database(process.env.DB_PATH || ':memory:', (err) => {
            if (err) {
                console.error(err.message)
            }
            console.log('Connected to the in-memory SQLite database.')
        })

        this.initialize()
    }

    initialize() {
        this.db.run('CREATE TABLE IF NOT EXISTS evaluations (grid TEXT, result TEXT, path TEXT, datetime DATETIME)')
    }

    addEvaluation(grid, result, path) {
        return new Promise((resolve, reject) => {
            this.db.run(
                'INSERT INTO evaluations (grid, result, path, datetime) VALUES (?, ?, ?, datetime("now"))',
                [JSON.stringify(grid), result, JSON.stringify(path)],
                function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(this.lastID)
                    }
                }
            )
        })
    }
}

module.exports = new Database()
