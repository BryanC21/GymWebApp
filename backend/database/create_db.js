const mysql = require('mysql');
const path = require('path');
require('dotenv').config({path:__dirname+'/../.env'});
var drop = process.argv[2] === 'drop'; //node create_db.js drop

var con = mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PWD || 'root',
    port: process.env.DATABASE_PORT || 3306,
});

var dbName = process.env.DATABASE_DATABASE || 'gym_db';

con.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

if (drop == true) {
    var sql = `DROP DATABASE IF EXISTS ${dbName}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("DATABASE dropped");
    });

    var sql = `CREATE DATABASE ${dbName}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("DATABASE created");
    });
}
con.changeUser({ database: dbName }, function (err) {
    if (err) throw err;
    console.log("Switched to database " + dbName);
});



var sql = "CREATE TABLE Level (\
    id INT NOT NULL AUTO_INCREMENT, \
    name VARCHAR(255) NOT NULL, \
    PRIMARY KEY(id)) ";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Level created");
});

var sql = "CREATE TABLE Gender (\
    id INT NOT NULL AUTO_INCREMENT, \
    name VARCHAR(255) NOT NULL, \
    PRIMARY KEY(id)) ";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Gender created");
});

var sql = "CREATE TABLE Location (\
    id INT NOT NULL AUTO_INCREMENT, \
    city VARCHAR(255), \
    state VARCHAR(255), \
    country VARCHAR(255), \
    PRIMARY KEY(id)) ";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE TABLE created");
});

var sql = "CREATE TABLE Gym (\
    id INT NOT NULL AUTO_INCREMENT, \
    location_id INT NOT NULL, \
    address VARCHAR(255), \
    PRIMARY KEY(id), \
    FOREIGN KEY (location_id) REFERENCES Location(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Gym created");
});

var sql = "CREATE TABLE Activity (\
    id INT NOT NULL AUTO_INCREMENT, \
    name VARCHAR(255) NOT NULL, \
    PRIMARY KEY(id)) ";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Gym created");
});

var sql = "CREATE TABLE User (\
    id INT NOT NULL AUTO_INCREMENT, \
    first_name VARCHAR(255) NOT NULL, \
    last_name VARCHAR(255) NOT NULL, \
    gender_id INT NOT NULL, \
    phone VARCHAR(255) NOT NULL UNIQUE, \
    email VARCHAR(255) NOT NULL UNIQUE, \
    password VARCHAR(255) NOT NULL,\
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    level_id INT NOT NULL, \
    PRIMARY KEY(id), \
    FOREIGN KEY (gender_id) REFERENCES Gender(id) ON DELETE CASCADE, \
    FOREIGN KEY (level_id) REFERENCES Level(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE USER created");
});

var sql = "CREATE TABLE Employee (\
    id INT NOT NULL AUTO_INCREMENT, \
    first_name VARCHAR(255) NOT NULL, \
    last_name VARCHAR(255) NOT NULL, \
    gender_id INT NOT NULL, \
    phone VARCHAR(255) NOT NULL UNIQUE, \
    email VARCHAR(255) NOT NULL UNIQUE, \
    password VARCHAR(255) NOT NULL,\
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    level_id INT NOT NULL, \
    gym_id INT NOT NULL, \
    PRIMARY KEY(id), \
    FOREIGN KEY (gym_id) REFERENCES Gym(id) ON DELETE CASCADE, \
    FOREIGN KEY (gender_id) REFERENCES Gender(id) ON DELETE CASCADE, \
    FOREIGN KEY (level_id) REFERENCES Level(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Employee created");
});


var sql = "CREATE TABLE Checkin (\
    id INT NOT NULL AUTO_INCREMENT, \
    user_id INT NOT NULL, \
    employee_id INT NOT NULL, \
    checkin_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    checkout_time TIMESTAMP DEFAULT NULL, \
    PRIMARY KEY(id), \
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE, \
    FOREIGN KEY (employee_id) REFERENCES Employee(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Checkin created");
});

var sql = "CREATE TABLE Class (\
    id INT NOT NULL AUTO_INCREMENT, \
    activity_id INT NOT NULL, \
    employee_id INT NOT NULL, \
    gym_id INT NOT NULL, \
    start_time TIMESTAMP, \
    duration INT, \
    capacity INT, \
    PRIMARY KEY(id), \
    FOREIGN KEY (activity_id) REFERENCES Activity(id) ON DELETE CASCADE, \
    FOREIGN KEY (gym_id) REFERENCES Gym(id) ON DELETE CASCADE, \
    FOREIGN KEY (employee_id) REFERENCES Employee(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Class created");
});

var sql = "CREATE TABLE Enroll (\
    id INT NOT NULL AUTO_INCREMENT, \
    user_id INT NOT NULL, \
    class_id INT NOT NULL, \
    PRIMARY KEY(id), \
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE, \
    FOREIGN KEY (class_id) REFERENCES Class(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Enroll created");
});

var sql = "CREATE TABLE Log (\
    id INT NOT NULL AUTO_INCREMENT, \
    user_id INT NOT NULL, \
    activity_id INT NOT NULL, \
    duration INT NOT NULL, \
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    PRIMARY KEY(id), \
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE, \
    FOREIGN KEY (activity_id) REFERENCES Activity(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Log created");
});

var sql = "CREATE TABLE Expire (\
    id INT NOT NULL AUTO_INCREMENT, \
    user_id INT NOT NULL, \
    expire_time TIMESTAMP, \
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    PRIMARY KEY(id), \
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Expire created");
});


//Insert Gender
var sql = "INSERT INTO Gender (name) VALUES ('Male')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Gender inserted");
});
var sql = "INSERT INTO Gender (name) VALUES ('Female')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Gender inserted");
});

//Insert Level
var sql = "INSERT INTO Level (name) VALUES ('Admin')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Level inserted");
});
var sql = "INSERT INTO Level (name) VALUES ('Employee')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Level inserted");
});
var sql = "INSERT INTO Level (name) VALUES ('VIP')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Level inserted");
});
var sql = "INSERT INTO Level (name) VALUES ('User')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Level inserted");
});


// insert location
var sql = "INSERT INTO Location (city, state, country) VALUES ('San Jose', 'CA', 'The United States')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Location inserted");
});
var sql = "INSERT INTO Location (city, state, country) VALUES ('New York', 'NY', 'The United States')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Location inserted");
});
var sql = "INSERT INTO Location (city, state, country) VALUES ('San Francisco', 'CA', 'The United States')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Location inserted");
});
var sql = "INSERT INTO Location (city, state, country) VALUES ('Los Angelas', 'CA', 'The United States')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Location inserted");
});
var sql = "INSERT INTO Location (city, state, country) VALUES ('Boston', 'MA', 'The United States')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Location inserted");
});

// insert gym
var sql = "INSERT INTO Gym (location_id, address) VALUES (1, '1 Washington Sq')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Gym inserted");
});
var sql = "INSERT INTO Gym (location_id, address) VALUES (1, '1701 Airport Blvd')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Gym inserted");
});
var sql = "INSERT INTO Gym (location_id, address) VALUES (2, '7 E 12th St')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Gym inserted");
});
var sql = "INSERT INTO Gym (location_id, address) VALUES (3, '505 Parnassus Ave')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Gym inserted");
});
var sql = "INSERT INTO Gym (location_id, address) VALUES (4, '425 Westwood Plaza')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Gym inserted");
});
var sql = "INSERT INTO Gym (location_id, address) VALUES (5, '725 Commonwealth Ave')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Gym inserted");
});

// insert activity
var sql = "INSERT INTO Activity (name) VALUES ('Yoga')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Pilates')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Circuit Training')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Water Aerobics')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('HIIT')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Cycling')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Bootcamp')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Zumba')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Kickboxing')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Training bench')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Dumbbell')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Barbell')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Rowing machine')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});
var sql = "INSERT INTO Activity (name) VALUES ('Ellipticals')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Activity inserted");
});

// insert user
var sql = "INSERT INTO User (first_name, last_name, gender_id, phone, email, password, level_id) \
VALUES ('John', 'Doe', 1, '1231231231', 'johndoe@gmail.com', '202cb962ac59075b964b07152d234b70', 3)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 User inserted");
});

var sql = "INSERT INTO User (first_name, last_name, gender_id, phone, email, password, level_id) \
VALUES ('Doe', 'John', 2, '1231231232', 'doejohn@gmail.com', '202cb962ac59075b964b07152d234b70', 3)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 User inserted");
});

var sql = "INSERT INTO User (first_name, last_name, gender_id, phone, email, password, level_id) \
VALUES ('Kevin', 'Doe', 1, '1231231233', 'kevindoe@gmail.com', '202cb962ac59075b964b07152d234b70', 3)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 User inserted");
});

var sql = "INSERT INTO User (first_name, last_name, gender_id, phone, email, password, level_id) \
VALUES ('Doe', 'Kevin', 2, '1231231234', 'doekevin@gmail.com', '202cb962ac59075b964b07152d234b70', 4)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 User inserted");
});

var sql = "INSERT INTO User (first_name, last_name, gender_id, phone, email, password, level_id) \
VALUES ('Mary', 'Doe', 1, '1231231235', 'marydoe@gmail.com', '202cb962ac59075b964b07152d234b70', 4)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 User inserted");
});

// insert employee
var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('admin1', 'gym1', 2, '3213213211', 'admin1gym1@gmail.com', '202cb962ac59075b964b07152d234b70', 1, 1)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('admin1', 'gym2', 1, '3213213212', 'admin1gym2@gmail.com', '202cb962ac59075b964b07152d234b70', 1, 2)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('admin1', 'gym3', 1, '3213213213', 'admin1gym3@gmail.com', '202cb962ac59075b964b07152d234b70', 1, 3)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('admin1', 'gym4', 2, '3213213214', 'admin1gym4@gmail.com', '202cb962ac59075b964b07152d234b70', 1, 4)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('admin1', 'gym5', 1, '3213213215', 'admin1gym5@gmail.com', '202cb962ac59075b964b07152d234b70', 1, 5)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('admin1', 'gym6', 1, '3213213216', 'admin1gym6@gmail.com', '202cb962ac59075b964b07152d234b70', 1, 6)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('employee1', 'gym1', 2, '1231231211', 'employee1gym1@gmail.com', '202cb962ac59075b964b07152d234b70', 2, 1)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('employee2', 'gym1', 1, '1231231212', 'employee2gym1@gmail.com', '202cb962ac59075b964b07152d234b70', 2, 1)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('employee1', 'gym2', 2, '1231231221', 'employee1gym2@gmail.com', '202cb962ac59075b964b07152d234b70', 2, 2)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('employee1', 'gym3', 1, '1231231231', 'employee1gym3@gmail.com', '202cb962ac59075b964b07152d234b70', 2, 3)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('employee1', 'gym4', 1, '1231231241', 'employee1gym4@gmail.com', '202cb962ac59075b964b07152d234b70', 2, 4)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('employee1', 'gym5', 2, '1231231251', 'employee1gym5@gmail.com', '202cb962ac59075b964b07152d234b70', 2, 5)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

var sql = "INSERT INTO Employee (first_name, last_name, gender_id, phone, email, password, level_id, gym_id) \
VALUES ('employee1', 'gym6', 2, '1231231261', 'employee1gym6@gmail.com', '202cb962ac59075b964b07152d234b70', 2, 6)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Employee inserted");
});

// insert class
var sql = "INSERT INTO Class (activity_id, employee_id, gym_id, start_time, duration, capacity) \
VALUES (1, 1, 1, '2023-03-10 10:00:00', 60, 20)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Class inserted");
});

var sql = "INSERT INTO Class (activity_id, employee_id, gym_id, start_time, duration, capacity) \
VALUES (2, 1, 1, '2023-03-10 12:00:00', 60, 20)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Class inserted");
});

var sql = "INSERT INTO Class (activity_id, employee_id, gym_id, start_time, duration, capacity) \
VALUES (1, 1, 1, '2023-03-11 10:00:00', 60, 20)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Class inserted");
});

var sql = "INSERT INTO Class (activity_id, employee_id, gym_id, start_time, duration, capacity) \
VALUES (2, 1, 1, '2023-03-11 12:00:00', 60, 20)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Class inserted");
});

//insert enroll
var sql = "INSERT INTO Enroll (user_id, class_id) \
VALUES (1, 1)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Enroll inserted");
});

var sql = "INSERT INTO Enroll (user_id, class_id) \
VALUES (2, 1)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Enroll inserted");
});

var sql = "INSERT INTO Enroll (user_id, class_id) \
VALUES (3, 1)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Enroll inserted");
});

var sql = "INSERT INTO Enroll (user_id, class_id) \
VALUES (4, 1)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Enroll inserted");
});

var sql = "INSERT INTO Enroll (user_id, class_id) \
VALUES (5, 1)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Enroll inserted");
});

var sql = "INSERT INTO Enroll (user_id, class_id) \
VALUES (1, 3)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Enroll inserted");
});

var sql = "INSERT INTO Enroll (user_id, class_id) \
VALUES (2, 3)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Enroll inserted");
});

var sql = "INSERT INTO Enroll (user_id, class_id) \
VALUES (3, 3)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Enroll inserted");
});

var sql = "INSERT INTO Enroll (user_id, class_id) \
VALUES (4, 4)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Enroll inserted");
});

var sql = "INSERT INTO Enroll (user_id, class_id) \
VALUES (5, 4)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Enroll inserted");
});

var sql = "INSERT INTO Checkin (user_id, employee_id, checkin_time, checkout_time) \
VALUES (1, 1, TIMESTAMP '2023-04-10 07:00:00.00', TIMESTAMP '2023-04-10 12:00:00.00')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Checkin inserted");
});

var sql = "INSERT INTO Checkin (user_id, employee_id, checkin_time, checkout_time) \
VALUES (2, 1, TIMESTAMP '2023-04-10 07:00:00.00', TIMESTAMP '2023-04-10 12:00:00.00')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Checkin inserted");
});

var sql = "INSERT INTO Checkin (user_id, employee_id, checkin_time, checkout_time) \
VALUES (3, 1, TIMESTAMP '2023-04-10 07:00:00.00', TIMESTAMP '2023-04-10 12:00:00.00')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Checkin inserted");
});

var sql = "INSERT INTO Checkin (user_id, employee_id, checkin_time, checkout_time) \
VALUES (1, 1, TIMESTAMP '2023-04-11 07:00:00.00', TIMESTAMP '2023-04-11 12:00:00.00')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Checkin inserted");
});

var sql = "INSERT INTO Checkin (user_id, employee_id, checkin_time, checkout_time) \
VALUES (1, 1, TIMESTAMP '2023-04-12 07:00:00.00', TIMESTAMP '2023-04-12 12:00:00.00')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Checkin inserted");
});

var sql = "INSERT INTO Checkin (user_id, employee_id, checkin_time, checkout_time) \
VALUES (1, 1, TIMESTAMP '2023-04-13 07:00:00.00', TIMESTAMP '2023-04-13 12:00:00.00')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Checkin inserted");
});

var sql = "INSERT INTO Checkin (user_id, employee_id, checkin_time, checkout_time) \
VALUES (1, 1, TIMESTAMP '2023-04-14 07:00:00.00', TIMESTAMP '2023-04-14 12:00:00.00')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Checkin inserted");
});

var sql = "INSERT INTO Checkin (user_id, employee_id, checkin_time, checkout_time) \
VALUES (1, 1, TIMESTAMP '2023-04-15 07:00:00.00', TIMESTAMP '2023-04-15 12:00:00.00')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Checkin inserted");
});

con.end();
