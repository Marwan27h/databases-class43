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
    const query1 = ` 
    CREATE TABLE IF NOT EXISTS research_papers (
    paper_id INT PRIMARY KEY,
    paper_title VARCHAR(100),
    conference VARCHAR(50),
    publish_date DATE,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
    )`

    const query2 = `
    CREATE TABLE IF NOT EXISTS author_paper_relationship (
    author_id INT,
    paper_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
    )`
    const query3 = `
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
    const query4 = `
    INSERT INTO research_Papers (paper_id, paper_title, conference, publish_date, author_id)
          VALUES
            (1, 'Paper 1', 'Conference 1', '2022-01-01', 1),
            (2, 'Paper 2', 'Conference 2', '2022-02-02', 2),
            (3, 'Paper 3', 'Conference 3', '2022-02-02', 3),
            (4, 'Paper 4', 'Conference 4', '2022-12-02', 4),
            (5, 'Paper 5', 'Conference 5', '2022-02-02', 5),
            (6, 'Paper 6', 'Conference 6', '2022-01-11', 6),
            (7, 'Paper 7', 'Conference 7', '2022-12-02', 7),
            (8, 'Paper 8', 'Conference 8', '2022-02-02', 8),
            (9, 'Paper 9', 'Conference 9', '2022-02-02', 9),
            (10, 'Paper 10', 'Conference 10', '2022-02-02', 10),
            (11, 'Paper 11', 'Conference 11', '2022-02-02', 11),
            (12, 'Paper 12', 'Conference 12', '2022-02-02', 12),
            (13, 'Paper 13', 'Conference 13', '2022-02-02', 13),
            (14, 'Paper 14', 'Conference 14', '2022-02-02', 14),
            (15, 'Paper 15', 'Conference 15', '2022-02-02', 15),
            (16, 'Paper 16', 'Conference 16', '2022-02-02', 1),
            (17, 'Paper 17', 'Conference 17', '2022-02-02', 2),
            (18, 'Paper 18', 'Conference 18', '2022-02-02', 3),
            (19, 'Paper 19', 'Conference 19', '2022-02-02', 4),
            (20, 'Paper 20', 'Conference 20', '2022-02-02', 5),
            (21, 'Paper 21', 'Conference 21', '2022-02-02', 3),
            (22, 'Paper 22', 'Conference 22', '2022-02-02', 3),
            (23, 'Paper 23', 'Conference 23', '2022-02-02', 12),
            (24, 'Paper 24', 'Conference 24', '2022-02-02', 13),
            (25, 'Paper 14', 'Conference 14', '2022-02-02', 14),
            (26, 'Paper 15', 'Conference 15', '2022-02-02', 15),
            (27, 'Paper 16', 'Conference 16', '2022-02-02', 1),
            (28, 'Paper 17', 'Conference 17', '2022-02-02', 2),
            (29, 'Paper 18', 'Conference 18', '2022-02-02', 3),
            (30, 'Paper 19', 'Conference 19', '2022-02-02', 4)
    `
    console.log("Research papers table has been created or already exists")
    const result1 = await query(query1)
    console.log(result1)

    console.log(
        "Author-Paper relationship table has been created or already exists"
    )
    const result2 = await query(query2)
    console.log(result2)

    console.log("Authors inserted successfully")
    const result3 = await query(query3)
    console.log(result3)

    console.log("Research papers inserted successfully")
    const result4 = await query(query4)
    console.log(result4)
}
runQueries()
