const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
	host: process.env.DATABASE_HOST || 'localhost',
	user: process.env.DATABASE_USER || 'root',
	password: process.env.DB_PASSWORD || 'root',
	port: process.env.DB_PORT || 3306,
	database: process.env.DB_NAME || 'gym_db',
	waitForConnections: true,
	connectionLimit: 50
});

module.exports = pool;