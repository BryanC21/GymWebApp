const db = require("../db_connection");
const crypto = require('crypto')

exports.getAllEmployees = (req, res) => {
    let sql = "SELECT Employee.first_name, Employee.last_name, Employee.phone, Employee.email, Employee.gender_id, \
    Employee.create_time, Employee.level_id, Employee.gym_id, Level.name as level, Gender.name as gender \
    FROM Employee, Level, Gender \
    where Employee.level_id = level.id and Employee.gender_id = Gender.id"

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No employees found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

exports.getAllEmployeesByGym = (req, res) => {
    const gym_id = req.query.gym_id;

    let sql = "SELECT Employee.first_name, Employee.last_name, Employee.phone, Employee.email, Employee.gender_id, \
    Employee.create_time, Employee.level_id, Employee.gym_id, Level.name as level, Gender.name as gender \
    FROM Employee, Level, Gender \
    where Employee.level_id = level.id and Employee.gender_id = Gender.id and Employee.gym_id = ?"

    db.query(sql, [gym_id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No employees found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

exports.getEmployeeByID = (req, res) => {
    const employee_id = req.query.employee_id;

    let sql = "SELECT Employee.first_name, Employee.last_name, Employee.phone, Employee.email, Employee.gender_id, \
    Employee.create_time, Employee.level_id, Employee.gym_id, Level.name as level, Gender.name as gender \
    FROM Employee, Level, Gender \
    where Employee.id = ? and Employee.level_id = level.id and Employee.gender_id = Gender.id";

    db.query(sql, [employee_id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No employee found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results[0]
        })
    });
}

exports.editUserByID = (req, res) => {
    const id = req.query.id
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const gender_id = req.query.gender
    const email = req.query.email
    const phone = req.query.phone
    const password = crypto.createHash('md5').update(req.query.password).digest("hex");
    const level_id = req.query.level_id

    let sql = "UPDATE User SET first_name = ?, last_name = ?, gender_id = ?, email = ?, phone = ?, \
    password = ?, level_id = ? \
    WHERE id = ?"

    db.query(sql, [first_name, last_name, gender_id, email, phone, password, level_id, id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    });
}

exports.enrollUser = (req, res) => {
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const phone = req.query.phone;
    const email = req.query.email;
    const gender_id = req.query.gender_id;
    const level_id = req.query.level_id;
    const password = crypto.createHash('md5').update(req.query.password).digest("hex");

    let sql = "INSER INTO USER (first_name, last_name, phone, email, gender_id, \
    level_id, passwrod) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [first_name, last_name, phone, email, gender_id, level_id, 
        password], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "Enroll failed"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    });
}

exports.checkinUser = (req, res) => {
    const user_id = req.query.user_id;
    const employee_id = req.query.employee_id;

    let sql = "INSER INTO Checkin (user_id, employee_id) VALUES (?, ?)";

    db.query(sql, [user_id, employee_id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "Enroll failed"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    });
}
