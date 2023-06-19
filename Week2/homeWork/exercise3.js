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
        const query1 = `
            SELECT a.author_name, m.author_name AS mentor_name
            FROM authors a
            LEFT JOIN authors m ON a.mentor = m.author_id;
        `
        const query2 = `
            SELECT a.author_name, IFNULL(rp.paper_title, 'No Research Paper') AS published_paper_title
            FROM authors a
            LEFT JOIN research_papers rp ON a.author_id = rp.author_id;
        `
        const query3 = `
            SELECT rp.paper_title, COUNT(rp.author_id) AS author_count
            FROM research_papers rp
            GROUP BY rp.paper_id;
        `
        const query4 = `
            SELECT COUNT(*) AS total_papers_published
            FROM research_papers rp
            INNER JOIN authors a ON rp.author_id = a.author_id
            WHERE a.gender = 'Female';
        `
        const query5 = `
            SELECT a.university, AVG(a.h_index) AS average_h_index
            FROM authors a
            GROUP BY a.university;
        `
        const query6 = `
            SELECT a.university, COUNT(rp.paper_id) AS total_papers
            FROM authors a
            LEFT JOIN research_papers rp ON a.author_id = rp.author_id
            GROUP BY a.university;
        `
        const query7 = `
            SELECT a.university, MIN(a.h_index) AS min_h_index, MAX(a.h_index) AS max_h_index
            FROM authors a
            GROUP BY a.university;
        `

        console.log("Names of authors and their corresponding mentors:")
        const results1 = await query(query1)
        console.log(results1)

        console.log("Authors and their published paper titles:")
        const results2 = await query(query2)
        console.log(results2)

        console.log(
            "All research papers and the number of authors that wrote that paper:"
        )
        const results3 = await query(query3)
        console.log(results3)

        console.log(
            "Sum of the research papers published by all female authors:"
        )
        const results4 = await query(query4)
        console.log(results4)

        console.log("Average of the h-index of all authors per university:")
        const results5 = await query(query5)
        console.log(results5)

        console.log("Sum of the research papers of the authors per university:")
        const results6 = await query(query6)
        console.log(results6)

        console.log(
            "Minimum and maximum of the h-index of all authors per university:"
        )
        const results7 = await query(query7)
        console.log(results7)

        connection.end()
    } catch (err) {
        console.error("Error:", err)
    }
}

runQueries()
