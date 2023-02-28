const mysql = require('mysql');
const path = require('path');
require('dotenv').config();
var drop = process.argv[2] === 'drop'; //node db_builder.js drop

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

var sql = "CREATE TABLE Location (\
    id INT NOT NULL AUTO_INCREMENT, \
    name VARCHAR(255) NOT NULL, \
    PRIMARY KEY(id)) ";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE TABLE created");
});

var sql = "CREATE TABLE Gym (\
    id INT NOT NULL AUTO_INCREMENT, \
    location INT NOT NULL, \
    PRIMARY KEY(id), \
    FOREIGN KEY (location) REFERENCES Location(id) ON DELETE CASCADE)";
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
    phone VARCHAR(255) NOT NULL UNIQUE, \
    email VARCHAR(255) NOT NULL UNIQUE, \
    password VARCHAR(255) NOT NULL,\
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    level INT NOT NULL, \
    PRIMARY KEY(id), \
    FOREIGN KEY (level) REFERENCES Level(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE USER created");
});

var sql = "CREATE TABLE Employee (\
    id INT NOT NULL AUTO_INCREMENT, \
    first_name VARCHAR(255) NOT NULL, \
    last_name VARCHAR(255) NOT NULL, \
    phone VARCHAR(255) NOT NULL UNIQUE, \
    email VARCHAR(255) NOT NULL UNIQUE, \
    password VARCHAR(255) NOT NULL,\
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    level INT NOT NULL, \
    gym INT NOT NULL, \
    PRIMARY KEY(id), \
    FOREIGN KEY (gym) REFERENCES Gym(id) ON DELETE CASCADE, \
    FOREIGN KEY (level) REFERENCES Level(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Employee created");
});


var sql = "CREATE TABLE Checkin (\
    id INT NOT NULL AUTO_INCREMENT, \
    user INT NOT NULL, \
    employee INT NOT NULL, \
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    PRIMARY KEY(id), \
    FOREIGN KEY (user) REFERENCES User(id) ON DELETE CASCADE, \
    FOREIGN KEY (employee) REFERENCES Employee(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Checkin created");
});

var sql = "CREATE TABLE Class (\
    id INT NOT NULL AUTO_INCREMENT, \
    activity INT NOT NULL, \
    employee INT NOT NULL, \
    gym INT NOT NULL, \
    start_time TIMESTAMP, \
    duration INT, \
    PRIMARY KEY(id), \
    FOREIGN KEY (activity) REFERENCES Activity(id) ON DELETE CASCADE, \
    FOREIGN KEY (gym) REFERENCES Gym(id) ON DELETE CASCADE, \
    FOREIGN KEY (employee) REFERENCES Employee(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Class created");
});

var sql = "CREATE TABLE Enroll (\
    id INT NOT NULL AUTO_INCREMENT, \
    user INT NOT NULL, \
    class INT NOT NULL, \
    PRIMARY KEY(id), \
    FOREIGN KEY (user) REFERENCES User(id) ON DELETE CASCADE, \
    FOREIGN KEY (class) REFERENCES Class(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Enroll created");
});

var sql = "CREATE TABLE Log (\
    id INT NOT NULL AUTO_INCREMENT, \
    user INT NOT NULL, \
    activity INT NOT NULL, \
    duration INT NOT NULL, \
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    PRIMARY KEY(id), \
    FOREIGN KEY (user) REFERENCES User(id) ON DELETE CASCADE, \
    FOREIGN KEY (activity) REFERENCES Activity(id) ON DELETE CASCADE)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("TABLE Enroll created");
});

//Inserts

// var sql = "INSERT INTO User (first_name, last_name, phone_number, password, level) VALUES ('John', 'Doe', '1231231231', '$2b$10$2Q0Nb2exzidQZMWBrHE5Q.BvJ2aKUx4VaZ4yAXcfPdrY3JKJboCjm', 'admin')";
// con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 User inserted");
// });
// var sql = "INSERT INTO User (first_name, last_name, phone_number, password, level) VALUES ('Doe', 'John', '1231231232', '$2b$10$2Q0Nb2exzidQZMWBrHE5Q.BvJ2aKUx4VaZ4yAXcfPdrY3JKJboCjm', 'user')";
// con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 User inserted");
// });
// var sql = "INSERT INTO User (first_name, last_name, phone_number, password, level) VALUES ('PICKUP', 'PICKUP', '0000000000', '$2b$10$2Q0Nb2exzidQZMWBrHE5Q.BvJ2aKUx4VaZ4yAXcfPdrY3JKJboCjm', 'user')";
// con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 User inserted");
// });

// var sql = "INSERT INTO Restaurant (name, description, logo, owner_id) VALUES ('Johns Restaurant', 'A restaurant', 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg', 1)";
// con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
// });

// //var sql = "INSERT INTO Menu_Item (name, description, image, price, restaurant_id) VALUES ('Pizza', 'A pizza', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg', '10.00', 1)";
// //con.query(sql, function (err, result) {
// //    if (err) throw err;
// //    console.log("1 record inserted");
// //});

con.end();