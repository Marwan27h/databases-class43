const mysql = require("mysql")
const fs = require("fs")
const path = require("path")

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
})

function executeQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

async function executeAndPrintQuery(query, description) {
    try {
        const results = await executeQuery(query)
        console.log(description)
        results.forEach((row) => {
            console.log(row.Name || row.Population)
        })
        console.log("___________________________________________________")
    } catch (err) {
        console.error("An error occurred while executing the query:", err)
    }
}

async function runQueries() {
    try {
        connection.connect()
        console.log("Connected to the database")

        await executeQuery("CREATE DATABASE IF NOT EXISTS world")
        console.log("World database has been created")

        await executeQuery("USE world")

        const sqlFilePath = path.join(__dirname, "world.sql")
        const sql = fs.readFileSync(sqlFilePath, "utf8")
        const sqlStatements = sql.split(";")

        await sqlStatements.reduce(
            (promise, query) => promise.then(() => executeQuery(query)),
            Promise.resolve()
        )

        console.log("All SQL statements executed successfully")

        await executeAndPrintQuery(
            "SELECT Name FROM country WHERE Population > 8000000",
            "The countries with Population greater than 8 million"
        )

        await executeAndPrintQuery(
            'SELECT Name FROM country WHERE Name LIKE "%land%"',
            "Countries that have 'land' in their names"
        )

        await executeAndPrintQuery(
            "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
            "Cities with population between 500,000 and 1 million"
        )

        await executeAndPrintQuery(
            "SELECT Name FROM country WHERE Continent = 'Europe'",
            "Countries in the continent 'Europe':"
        )

        await executeAndPrintQuery(
            "SELECT Name FROM country ORDER BY SurfaceArea DESC",
            "Countries in descending order of surface area:"
        )

        await executeAndPrintQuery(
            "SELECT Name FROM city WHERE CountryCode = 'NLD'",
            "Cities in the Netherlands:"
        )

        await executeAndPrintQuery(
            "SELECT Population FROM city WHERE Name ='Rotterdam'",
            "Population of Rotterdam:"
        )

        await executeAndPrintQuery(
            "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10",
            "Top 10 countries by Surface Area:"
        )

        await executeAndPrintQuery(
            "SELECT Name FROM city ORDER BY Population DESC LIMIT 10",
            "Top 10 most populated cities:"
        )

        const results10 = await executeQuery(
            "SELECT SUM(Population) AS WorldPopulation FROM country"
        )
        console.log("Population number of the world:")
        console.log(results10[0].WorldPopulation)
        console.log("___________________________________________________")

        connection.end()
        console.log("Disconnected from MySQL server")
    } catch (err) {
        console.error("An error occurred:", err)
    }
}

runQueries()
