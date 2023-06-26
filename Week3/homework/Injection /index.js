const mysql = require("mysql")
const fs = require("fs")
const path = require("path")
const util = require("util")

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
})
// example SELECT Population FROM Country WHERE Name = 'France' OR '1'='1' -- ' and code = 'FRA'//

const query = util.promisify(connection.query).bind(connection)

async function connectDatabase() {
    try {
        connection.connect()

        const sqlFilePath = path.join(__dirname, "world.sql")
        const sql = fs.readFileSync(sqlFilePath, "utf8")
        const sqlStatements = sql.split(";")

        for (const statement of sqlStatements) {
            await query(statement)
        }
    } catch (err) {
        throw err
    }
}

async function getPopulation(table, name, code) {
    try {
        const queryStr = "SELECT Population FROM ?? WHERE Name = ? AND code = ?"
        const values = [table, name, code]

        const result = await query(queryStr, values)

        if (result.length === 0) {
            throw new Error("Not found")
        }

        console.log(`Population: ${result[0].Population}`)
    } catch (err) {
        console.error(err)
    }
}

async function run() {
    try {
        await connectDatabase()
        await getPopulation("Country", "Netherlands", "NLD")
    } catch (err) {
        throw err
    } finally {
        connection.end()
    }
}

run()
