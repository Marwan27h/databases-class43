const mysql = require("mysql")
const util = require("util")

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "userdb",
})

connection.connect()

const query = util.promisify(connection.query).bind(connection)

async function runQueries() {
    try {
        const createAuthorsTable = `
            CREATE TABLE IF NOT EXISTS authors (
                author_id INT PRIMARY KEY,
                author_name VARCHAR(50),
                university VARCHAR(50),
                date_of_birth DATE,
                h_index INT,
                gender VARCHAR(10)
            )
        `

        const addedMentorColumn = `
            ALTER TABLE authors
            ADD COLUMN mentor INT,
            ADD CONSTRAINT fk_mentor
            FOREIGN KEY (mentor)
            REFERENCES authors(author_id)
        `

        console.log("THE TABLE AUTHORS HAS BEEN CREATED")
        const result1 = await query(createAuthorsTable)
        console.log(result1)

        console.log("MENTOR COLUMN HAS BEEN ADDED")
        const result2 = await query(addedMentorColumn)
        console.log(result2)

        connection.end()
    } catch (err) {
        console.error("Error:", err)
    }
}

runQueries()
