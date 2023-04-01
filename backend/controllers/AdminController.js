const db = require("../db_connection");
const crypto = require('crypto')

exports.getAllEmployees = (req, res) => {
    let sql = "SELECT Employee.id, Employee.first_name, Employee.last_name, Employee.phone, Employee.email, Employee.gender_id, \
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

    let sql = "SELECT Employee.id, Employee.first_name, Employee.last_name, Employee.phone, Employee.email, Employee.gender_id, \
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

    let sql = "SELECT Employee.id, Employee.first_name, Employee.last_name, Employee.phone, Employee.email, Employee.gender_id, \
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

