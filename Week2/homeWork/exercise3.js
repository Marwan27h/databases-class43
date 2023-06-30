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
        const allResearchPapersAndTheNumber = `
            SELECT a.author_name, m.author_name AS mentor_name
            FROM authors a
            LEFT JOIN authors m ON a.mentor = m.author_id;
        `
        const authorsAndTheirPublished = `
            SELECT a.*, rp.paper_title
            FROM authors AS a
            LEFT JOIN author_paper_relationship AS apr ON a.author_id = apr.author_id
            LEFT JOIN research_papers AS rp ON apr.paper_id = rp.paper_id;

        `
        const allResearchRapersAndTheNumberOfAuthors = `
           SELECT rp.paper_title, COUNT(DISTINCT CASE WHEN a.gender = 'Female' THEN apr.author_id END) AS num_authors
            FROM research_papers AS rp
            LEFT JOIN author_paper_relationship AS apr ON rp.paper_id = apr.paper_id
            LEFT JOIN authors AS a ON apr.author_id = a.author_id
            GROUP BY rp.paper_id;
        `
        const sumOfTheResearchPapersPublished = `
          SELECT COUNT(DISTINCT apr.paper_id) AS num_research_papers
            FROM author_paper_relationship AS apr
            JOIN authors AS a ON apr.author_id = a.author_id
            WHERE a.gender = 'Female';
        `
        const averageOfTheH_index = `
            SELECT a.university, AVG(a.h_index) AS average_h_index
            FROM authors a
            GROUP BY a.university;
        `
        const sumAuthorsPerUniversity = `
           SELECT a.university, COUNT(apr.paper_id) AS num_research_papers
            FROM authors AS a
            LEFT JOIN author_paper_relationship AS apr ON a.author_id = apr.author_id
            GROUP BY a.university;
        `
        const minimumAndMaximumOfTheH_index = `
            SELECT a.university, MIN(a.h_index) AS min_h_index, MAX(a.h_index) AS max_h_index
            FROM authors a
            GROUP BY a.university;
        `

        console.log("Names of authors and their corresponding mentors:")
        const results1 = await query(allResearchPapersAndTheNumber)
        console.log(results1)

        console.log("Authors and their published paper titles:")
        const results2 = await query(authorsAndTheirPublished)
        console.log(results2)

        console.log(
            "All research papers and the number of authors that wrote that paper:"
        )
        const results3 = await query(allResearchRapersAndTheNumberOfAuthors)
        console.log(results3)

        console.log(
            "Sum of the research papers published by all female authors:"
        )
        const results4 = await query(sumOfTheResearchPapersPublished)
        console.log(results4)

        console.log("Average of the h-index of all authors per university:")
        const results5 = await query(averageOfTheH_index)
        console.log(results5)

        console.log("Sum of the research papers of the authors per university:")
        const results6 = await query(sumAuthorsPerUniversity)
        console.log(results6)

        console.log(
            "Minimum and maximum of the h-index of all authors per university:"
        )
        const results7 = await query(minimumAndMaximumOfTheH_index)
        console.log(results7)

        connection.end()
    } catch (err) {
        console.error("Error:", err)
    }
}

runQueries()
