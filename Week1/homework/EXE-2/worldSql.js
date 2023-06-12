const mysql = require("mysql")
const fs = require("fs")
const path = require("path")

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
})

connection.connect((err) => {
    if (err) throw err
    console.log("connected to database")
})

connection.query("CREATE DATABASE IF NOT EXISTS world", (err) => {
    if (err) throw err
    console.log("World database has been created")
})

connection.query("USE world", (err) => {
    if (err) throw err
})

const sqlFilePath = path.join(__dirname, "world.sql")
const sql = fs.readFileSync(sqlFilePath, "utf8")

const sqlStatements = sql.split(";")

sqlStatements.forEach((statement) => {
    connection.query(statement, (err) => {
        if (err) throw err
    })
})
console.log("All SQL statements executed successfully")

connection.query(
    "SELECT Name FROM country WHERE Population > 8000000",
    (err, results) => {
        if (err) throw err
        console.log("The countries with Population greater than 8 million")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("___________________________________________________")
    }
)

connection.query(
    'SELECT Name FROM country WHERE Name LIKE "%land%"',
    (err, results) => {
        if (err) throw err
        console.log("Countries that have land word in their names")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("___________________________________________________")
    }
)

connection.query(
    "SELECT Name FROM city WHERE Population BETWEEN  500000 AND 1000000",
    (err, results) => {
        if (err) throw err
        console.log("Cities with population between 500,000 and 1 million")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("___________________________________________________")
    }
)

connection.query(
    "SELECT Name FROM country WHERE Continent = 'Europe'",
    (err, results) => {
        if (err) throw err
        console.log("Countries in the continent 'Europe':")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("___________________________________________________")
    }
)

connection.query(
    "SELECT Name FROM country ORDER BY SurfaceArea DESC",
    (err, results) => {
        if (err) throw err
        console.log("Countries in descending order of surface area:")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("___________________________________________________")
    }
)

connection.query(
    "SELECT Name FROM city  WHERE CountryCode = 'NLD'",
    (err, results) => {
        if (err) throw err
        console.log("Cities in the Netherlands:")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("___________________________________________________")
    }
)

connection.query(
    "SELECT Population FROM city WHERE Name ='Rotterdam' ",
    (err, results) => {
        if (err) throw err
        console.log("Population of Rotterdam:")
        results.forEach((row) => {
            console.log(row.Population)
        })
        console.log("___________________________________________________")
    }
)

connection.query(
    "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10",
    (err, results) => {
        if (err) throw err
        console.log("Top 10 countries by Surface Area:")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("___________________________________________________")
    }
)

connection.query(
    "SELECT Name FROM city ORDER BY Population DESC LIMIT 10",
    (err, results) => {
        if (err) throw err
        console.log("Top 10 most populated cities:")
        results.forEach((row) => {
            console.log(row.Name)
        })
        console.log("___________________________________________________")
    }
)

connection.query(
    "SELECT SUM(Population) AS WorldPopulation FROM country",
    (err, results) => {
        if (err) throw err
        console.log("Population number of the world:")
        console.log(results[0].WorldPopulation)
        console.log("___________________________________________________")
    }
)
connection.end((err) => {
    if (err) throw err
    console.log("Disconnected from MySQL server")
})
