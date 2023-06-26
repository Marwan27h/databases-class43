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
    const createResearchPapersTable = ` 
    CREATE TABLE IF NOT EXISTS research_papers (
        paper_id INT PRIMARY KEY,
        paper_title VARCHAR(100),
        conference VARCHAR(50),
        publish_date DATE,
        author_id INT,
        FOREIGN KEY (author_id) REFERENCES authors(author_id)
    
        )`

    const createAuthorsPaperRelationship = `
    CREATE TABLE IF NOT EXISTS author_paper_relationship (
        author_id INT,
        paper_id INT,
        FOREIGN KEY (author_id) REFERENCES authors(author_id),
        FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
    
        )`

    const insertAuthorsTable = `
    INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor)
    VALUES
            (1, 'Author 1', 'University 1', '1990-01-01', 10, 'Male', NULL),
            (2, 'Author 2', 'University 2', '1991-02-02', 12, 'Female', 1),
            (3, 'Author 3', 'University 3', '1991-02-03', 12, 'Female', 1),
            (4, 'Author 4', 'University 4', '1991-02-04', 12, 'Female', 1),
            (5, 'Author 5', 'University 5', '1991-02-05', 10, 'male', 4),
            (6, 'Author 6', 'University 2', '1991-02-02', 12, 'Female', 4),
            (7, 'Author 7', 'University 7', '1991-02-22', 12, 'Female', 4),
            (8, 'Author 8', 'University 2', '1991-02-11', 12, 'male', 4),
            (9, 'Author 9', 'University 3', '1991-02-02', 12, 'Female', 4),
            (10, 'Author 10', 'University 3', '1991-02-11', 12, 'male', 2),
            (11, 'Author 11', 'University 2', '1991-02-20', 12, 'male', 2),
            (12, 'Author 12', 'University 4', '1991-02-02', 12, 'Female', 2),
            (13, 'Author 13', 'University 2', '1991-02-23', 12, 'male', 1),
            (14, 'Author 14', 'University 3', '1991-01-02', 12, 'Female', 4),
            (15, 'Author 15', 'University 15', '1995-06-15', 8, 'Male', 3)
    
        `

    const insertResearchPapersTable = `
    INSERT INTO research_papers (paper_id, paper_title, conference, publish_date)
        VALUES
            (1, 'Paper 1', 'Conference 1', '2022-01-01'),
            (2, 'Paper 2', 'Conference 2', '2022-02-02'),
            (3, 'Paper 3', 'Conference 3', '2022-02-02'),
            (4, 'Paper 4', 'Conference 4', '2022-12-02'),
            (5, 'Paper 5', 'Conference 5', '2022-02-02'),
            (6, 'Paper 6', 'Conference 6', '2022-01-11'),
            (7, 'Paper 7', 'Conference 7', '2022-12-02'),
            (8, 'Paper 8', 'Conference 8', '2022-02-02'),
            (9, 'Paper 9', 'Conference 9', '2022-02-02'),
            (10, 'Paper 10', 'Conference 10', '2022-02-02'),
            (11, 'Paper 11', 'Conference 11', '2022-02-02'),
            (12, 'Paper 12', 'Conference 12', '2022-02-02'),
            (13, 'Paper 13', 'Conference 13', '2022-02-02'),
            (14, 'Paper 14', 'Conference 14', '2022-02-02'),
            (15, 'Paper 15', 'Conference 15', '2022-02-02'),
            (16, 'Paper 16', 'Conference 16', '2022-02-02'),
            (17, 'Paper 17', 'Conference 17', '2022-02-02'),
            (18, 'Paper 18', 'Conference 18', '2022-02-02'),
            (19, 'Paper 19', 'Conference 19', '2022-02-02'),
            (20, 'Paper 20', 'Conference 20', '2022-02-02'),
            (21, 'Paper 21', 'Conference 21', '2022-02-02'),
            (22, 'Paper 22', 'Conference 22', '2022-02-02'),
            (23, 'Paper 23', 'Conference 23', '2022-02-02'),
            (24, 'Paper 24', 'Conference 24', '2022-02-02'),
            (25, 'Paper 14', 'Conference 14', '2022-02-02'),
            (26, 'Paper 15', 'Conference 15', '2022-02-02'),
            (27, 'Paper 16', 'Conference 16', '2022-02-02'),
            (28, 'Paper 17', 'Conference 17', '2022-02-02'),
            (29, 'Paper 18', 'Conference 18', '2022-02-02'),
            (30, 'Paper 19', 'Conference 19', '2022-02-02')
    `
    const insertAuthorPaperRelationship = `
    INSERT INTO author_paper_relationship (author_id, paper_id)
    VALUES
            (1, 1),
            (2, 2),
            (3, 3),
            (4, 4),
            (5, 5),
            (6, 6),
            (7, 7),
            (8, 8),
            (9, 9),
            (10, 10),
            (11, 11),
            (12, 12),
            (13, 13),
            (14, 14),
            (15, 15),
            (1, 16),
            (2, 17),
            (3, 18),
            (4, 19),
            (5, 20),
            (3, 21),
            (3, 22),
            (12, 23),
            (13, 24),
            (14, 25),
            (15, 26),
            (1, 27),
            (2, 28),
            (3, 29),
            (4, 30)
`
    console.log("Research papers table has been created or already exists")
    const result1 = await query(createResearchPapersTable)
    console.log(result1)

    console.log(
        "Author-Paper relationship table has been created or already exists"
    )
    const result2 = await query(createAuthorsPaperRelationship)
    console.log(result2)

    console.log("Authors inserted successfully")
    const result3 = await query(insertAuthorsTable)
    console.log(result3)

    console.log("Research papers inserted successfully")
    const result4 = await query(insertResearchPapersTable)
    console.log(result4)

    console.log("Author-Paper relationships inserted successfully")
    const result5 = await query(insertAuthorPaperRelationship)
    console.log(result5)
}
runQueries()
