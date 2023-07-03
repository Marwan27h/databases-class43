const { MongoClient } = require("mongodb")

const uri =
    "mongodb+srv://user:5743584@cluster0.wxdsytg.mongodb.net/?retryWrites=true&w=majority"

const dbName = "databaseWeek4"
const collectionName = "accounts"

const setupData = async () => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true })
        await client.connect()

        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        const accounts = [
            {
                account_number: 104,
                balance: 5000,
                account_changes: [],
            },
            {
                account_number: 105,
                balance: 3000,
                account_changes: [],
            },
            {
                account_number: 106,
                balance: 7000,
                account_changes: [],
            },
        ]

        await collection.insertMany(accounts)

        client.close()

        console.log("Data setup completed successfully.")
    } catch (error) {
        console.error("Error:", error)
    }
}

setupData()
