const util = require("util")
const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "userdb",
})

connection.connect()

const query = util.promisify(connection.query).bind(connection)

async function runQueries() {
    const createAccountTable = `
    CREATE TABLE account (
      account_number INT PRIMARY KEY,
      balance DECIMAL(10, 2)
    )
  `

    const createAccountChangeTable = `
    CREATE TABLE account_changes (
      change_number INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT,
      amount DECIMAL(10, 2),
      changed_date DATE,
      remark VARCHAR(255),
      FOREIGN KEY (account_number) REFERENCES account(account_number)
    )
  `
    const insertAccountTable = `
    INSERT INTO account (account_number, balance)
  VALUES
    (101, 5000.00),
    (102, 3000.00),
    (103, 2000.00)
  `

    console.log("account table created")
    const result1 = await query(createAccountTable)
    console.log(result1)

    console.log("account_changes table created")
    const result2 = await query(createAccountChangeTable)
    console.log(result2)

    console.log("Sample data inserted into account table")
    const result3 = await query(insertAccountTable)
    console.log(result3)

    connection.end()
}

runQueries()
