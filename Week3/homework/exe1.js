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
        const createMemberTable = `
   CREATE TABLE Members (
      member_id INT PRIMARY KEY,
      member_name VARCHAR(255),
      member_address VARCHAR(255)
    )`
        const createDinnersTable = `
       CREATE TABLE Dinners (
      dinner_id VARCHAR(10) PRIMARY KEY,
      dinner_date DATE
    )`
        const createVenueTable = `
      CREATE TABLE Venues (
      venue_code VARCHAR(3) PRIMARY KEY,
      venue_description VARCHAR(255)
    )
    `
        const createFoodsTable = `
      CREATE TABLE Foods (
      food_code VARCHAR(3) PRIMARY KEY,
      food_description VARCHAR(255)
    )
    `
        const createDinnersMembersTable = `
       CREATE TABLE Dinner_Members (
      member_id INT,
      dinner_id VARCHAR(10),
      FOREIGN KEY (member_id) REFERENCES Members(member_id),
      FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id)
    )
    `
        const createDinnersVenueTable = `
      CREATE TABLE Dinner_Venues (
      dinner_id VARCHAR(10),
      venue_code VARCHAR(3),
      FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id),
      FOREIGN KEY (venue_code) REFERENCES Venues(venue_code)
    )
    `
        const createDinnersFoodsTable = `
      CREATE TABLE Dinner_Foods (
      dinner_id VARCHAR(10),
      food_code VARCHAR(3),
      FOREIGN KEY (dinner_id) REFERENCES Dinners(dinner_id),
      FOREIGN KEY (food_code) REFERENCES Foods(food_code)
    )
    `
        const insertMemberTable = `
       INSERT INTO Members (member_id, member_name, member_address)
    VALUES
      (1, 'Amit', '325 Max park'),
      (2, 'Ben', '24 Hudson lane'),
      (3, 'Cristina', '516 6th Ave'),
      (4, 'Dan', '89 John St'),
      (5, 'Gabor', '54 Vivaldi St'),
      (6, 'Hema', '9 Peter St')
    `
        const insertDinnersTable = `
      INSERT INTO Dinners (dinner_id, dinner_date)
  VALUES
    ('D00001001', '2020-03-15'),
    ('D00001002', '2020-03-15'),
    ('D00001003', '2020-03-20'),
    ('D00001004', '2020-03-25'),
    ('D00001005', '2020-03-26'),
    ('D00001006', '2020-04-01')
    `
        const insertVenueTable = `
      INSERT INTO Venues (venue_code, venue_description)
    VALUES
      ('B01', 'Grand Ball Room'),
      ('B02', 'Zoku Roof Top'),
      ('B03', 'Goat Farm'),
      ('B04', "Mama's Kitchen"),
      ('B05', 'Hungry Hungary')
    `
        const insertFoodsTable = `
       INSERT INTO Foods (food_code, food_description)
    VALUES
      ('C1', 'Curry'),
      ('C2', 'Cake'),
      ('S1', 'Soup'),
      ('P1', 'Pie'),
      ('T1', 'Tea'),
      ('M1', 'Mousse'),
      ('F1', 'Falafel'),
      ('G1', 'Goulash'),
      ('P2', 'Pasca')
    `
        const insertDinnersMembers = `
      INSERT INTO Dinner_Members (member_id, dinner_id)
    VALUES
      (1, 'D00001001'),
      (2, 'D00001002'),
      (3, 'D00001002'),
      (4, 'D00001003'),
      (1, 'D00001003')
    `

        console.log("Members table created")
        const results1 = await query(createMemberTable)
        console.log(results1)

        console.log("Dinners table created")
        const results2 = await query(createDinnersTable)
        console.log(results2)

        console.log("Venues table created")
        const results3 = await query(createVenueTable)
        console.log(results3)

        console.log("Foods table created")
        const results4 = await query(createFoodsTable)
        console.log(results4)

        console.log("Dinner_Members table created")
        const results5 = await query(createDinnersMembersTable)
        console.log(results5)

        console.log("Dinner_Venues table created")
        const results6 = await query(createDinnersVenueTable)
        console.log(results6)

        console.log("Dinner_Foods table created")
        const results7 = await query(createDinnersFoodsTable)
        console.log(results7)
        console.log("Members data inserted")
        const results8 = await query(insertMemberTable)
        console.log(results8)

        console.log("Dinners data inserted")
        const results9 = await query(insertDinnersTable)
        console.log(results9)

        console.log("Venues data inserted")
        const results10 = await query(insertVenueTable)
        console.log(results10)

        console.log("Foods data inserted")
        const results11 = await query(insertFoodsTable)
        console.log(results11)

        console.log("Dinner_Members data inserted")
        const results12 = await query(insertDinnersMembers)
        console.log(results12)
        connection.end()
    } catch (err) {
        console.error("Error:", err)
    }
}
runQueries()
/*

Violations of 1NF:

The "food_code" column violates 1NF because it contains multiple values separated by commas. The same applies to the "food_description" column.
Entities to be extracted:

Based on the data, we can identify the following entities:
Members (member_id, member_name, member_address)
Dinners (dinner_id, dinner_date)
Venues (venue_code, venue_description)
Foods (food_code, food_description)
Tables and columns for a 3NF compliant solution:

Members table: (member_id, member_name, member_address)
Dinners table: (dinner_id, dinner_date)
Venues table: (venue_code, venue_description)
Foods table: (food_code, food_description)
DinnerFoods table: (dinner_id, food_code)
*/
