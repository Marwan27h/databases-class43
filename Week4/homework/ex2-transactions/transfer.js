const { MongoClient } = require("mongodb")

const uri =
    "mongodb+srv://user:5743584@cluster0.wxdsytg.mongodb.net/?retryWrites=true&w=majority"
const dbName = "databaseWeek4"
const collectionName = "accounts"

const transferAmount = async (accountFrom, accountTo, amount, remark) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true })
        await client.connect()

        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        const session = client.startSession()
        
        session.startTransaction()
        try {
            const receiver = await collection.findOne(
                { account_number: accountTo },
                { session }
            )
            if (!receiver) {
                throw new Error(`Account ${accountTo} not found.`)
            }
            const sender = await collection.findOne(
                { account_number: accountFrom },
                { session }
            )
            if (!sender) {
                throw new Error(`Account ${accountFrom} not found.`)
            }
            if (sender.balance < amount) {
                throw new Error(`You don't have enough balance.`)
            }
            const updatedFromAccount = await collection.findOneAndUpdate(
                { account_number: accountFrom },
                {
                    $inc: { balance: -amount },
                    $push: {
                        account_changes: {
                            change_number: sender.account_changes.length + 1,
                            transfer_to_account: accountTo,
                            amount: -amount,
                            changed_date: new Date(),
                            remark,
                        },
                    },
                },
                { session, returnOriginal: false }
            )

            const updatedToAccount = await collection.findOneAndUpdate(
                { account_number: accountTo },
                {
                    $inc: { balance: amount },
                    $push: {
                        account_changes: {
                            change_number: receiver.account_changes.length + 1,
                            receive_from_account: accountFrom,
                            amount,
                            changed_date: new Date(),
                            remark,
                        },
                    },
                },
                { session, returnOriginal: false }
            )
            await session.commitTransaction()
            console.log("Transaction committed successfully.")
        } catch (err) {
            console.error("Transaction aborted:", err)
            await session.abortTransaction()
        } finally {
            session.endSession()
            client.close()
        }
    } catch (err) {
        console.error("Error connecting to MongoDB:", err)
    }
}

transferAmount(106, 105, 2000, "Done")
