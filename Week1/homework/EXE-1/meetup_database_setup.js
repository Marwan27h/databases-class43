import mysql from "mysql"

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
})

connection.connect((err) => {
    if (err) throw err
    console.log("Connected to the database")
})

connection.query("CREATE DATABASE IF NOT EXISTS meetup", (err) => {
    if (err) throw err
    console.log("Database meetup already created successfully")
})

connection.query("USE meetup", (err) => {
    if (err) throw err
    console.log("Using meetup database")
})

const createInviteeTable = `
  CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(50),
    invitee_by VARCHAR(50)
  )
`

connection.query(createInviteeTable, (err) => {
    if (err) throw err
    console.log("The Invitee table has been created")
})

const createRoomTable = `
  CREATE TABLE IF NOT EXISTS Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(50),
    floor_number INT
  )
`

connection.query(createRoomTable, (err) => {
    if (err) throw err
    console.log("The Room table has been created")
})

const createMeetingTable = `CREATE TABLE Meeting (
  meeting_no INT AUTO_INCREMENT PRIMARY KEY,
  meeting_title VARCHAR(255),
  starting_time DATETIME,
  ending_time DATETIME,
  room_no INT
)
`
connection.query(createMeetingTable, (err) => {
    if (err) throw err
    console.log("The Meeting table has been created")
})

const insertInviteeData = `
    INSERT INTO Invitee (invitee_name, invitee_by) VALUES
      ('Invitee 1', 'Inviter 1'),
      ('Invitee 2', 'Inviter 2'),
      ('Invitee 3', 'Inviter 3'),
      ('Invitee 4', 'Inviter 4'),
      ('Invitee 5', 'Inviter 5')
  `

connection.query(insertInviteeData, (err) => {
    if (err) throw err
    console.log("Invitee data inserted successfully")

    const insertRoomData = `
      INSERT INTO Room (room_name, floor_number) VALUES
        ('Room 1', 1),
        ('Room 2', 2),
        ('Room 3', 3),
        ('Room 4', 4),
        ('Room 5', 5)
    `

    connection.query(insertRoomData, (err) => {
        if (err) throw err
        console.log("Room data inserted successfully")

        const insertMeetingData = `
        INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
          ('Meeting 1', NOW(), NOW(), 1),
          ('Meeting 2', NOW(), NOW(), 2),
          ('Meeting 3', NOW(), NOW(), 3),
          ('Meeting 4', NOW(), NOW(), 4),
          ('Meeting 5', NOW(), NOW(), 5)
      `
        connection.query(insertMeetingData, (err) => {
            if (err) throw err
            console.log("Meeting data inserted successfully")

            connection.end((err) => {
                if (err) throw err
                console.log("Database connection closed")
            })
        })
    })
})
