const mysql = require("mysql")
const util = require("util")

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "userdb",
})

const query = util.promisify(connection.query).bind(connection)

const transferAmount = async (accountFrom, accountTo, amount) => {
    try {
        await query("START TRANSACTION")

        const accountFromBalanceResult = await query(
            "SELECT balance FROM account WHERE account_number = ?",
            [accountFrom]
        )
        const accountFromBalance = accountFromBalanceResult[0].balance

        if (accountFromBalance < amount) {
            throw new Error("Insufficient balance")
        }

        const accountToResult = await query(
            "SELECT * FROM account WHERE account_number = ?",
            [accountTo]
        )

        if (accountToResult.length === 0) {
            throw new Error(
                `The user with account number ${accountTo} is not found`
            )
        }

        await query(
            "UPDATE account SET balance = balance - ? WHERE account_number = ?",
            [amount, accountFrom]
        )

        await query(
            "UPDATE account SET balance = balance + ? WHERE account_number = ?",
            [amount, accountTo]
        )

        await query(
            `INSERT INTO account_changes (account_number, amount, changed_date, remark)
            VALUES (?, ?, CURDATE(), 'Transfer to Account ${accountTo} from Account ${accountFrom}')`,
            [accountTo, amount]
        )

        await query("COMMIT")

        console.log("Transaction complete")
    } catch (error) {
        await query("ROLLBACK")
        throw error
    } finally {
        connection.end()
    }
}
transferAmount(103, 102, 1000)
