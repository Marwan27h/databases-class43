const { MongoClient } = require("mongodb")

const uri =
    "mongodb+srv://user:5743584@cluster0.wxdsytg.mongodb.net/?retryWrites=true&w=majority"

const dbName = "databaseWeek4"
const collectionName = "population"

const getTotalPopulationByYear = async (country) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true })
        await client.connect()

        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        const result = await collection
            .aggregate([
                {
                    $match: {
                        Country: country,
                    },
                },
                {
                    $group: {
                        _id: "$Year",
                        countPopulation: {
                            $sum: { $add: ["$M", "$F"] },
                        },
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
            ])
            .toArray()

        console.log(result)

        client.close()
    } catch (error) {
        console.error("Error:", error)
    }
}

getTotalPopulationByYear("Netherlands")
