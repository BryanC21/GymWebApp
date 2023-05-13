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

exports.getClassCountByGymId = (req, res) => {
    const gym_id = req.query.gym_id;
    const interval = req.query.interval;

    //if no specify its day
    
    let date = "date(Class.start_time)";
    if (interval == "week") {
        date = "DATE(DATE_SUB(Class.start_time, INTERVAL WEEKDAY(Class.start_time) DAY))"
    }

    let sql = "SELECT " + date + " as time,  \
    COUNT(Class.id) as count \
    FROM Class, Employee \
    WHERE Employee.gym_id = ? and Employee.id = Class.employee_id \
    GROUP BY time";

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
                message: "No Class found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    });
}

exports.getEnrollCountByGymId = (req, res) => {
    const gym_id = req.query.gym_id;
    const interval = req.query.interval;

    let date = "date(Class.start_time)";
    if (interval == "week") {
        date = "DATE(DATE_SUB(start_time, INTERVAL WEEKDAY(start_time) DAY))"
    }

    let sql = "SELECT " + date + " as time,  \
    COUNT(Enroll.id) as count \
    FROM Class, Enroll, Employee \
    WHERE Employee.gym_id = ? and Employee.id = Class.employee_id and Enroll.class_id = Class.id \
    GROUP BY time";

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
                message: "No Enroll found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    });
}

exports.getMemberCountPerHourByGymId = (req, res) => {
    const gym_id = req.query.gym_id;

    let sql = "SELECT date(checkin_time) as time,  \
    hour(Checkin.checkin_time) as checkin_hour, \
    COUNT(Checkin.id) as count \
    FROM Checkin, Employee \
    WHERE Employee.gym_id = ? and Employee.id = Checkin.employee_id \
    GROUP BY time, checkin_hour";

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
                message: "No checkin found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    });
}

exports.getMemberCountPerHourByGymIdWithWeek = (req, res) => {
    const gym_id = req.query.gym_id;
    const interval = req.query.interval;

    let weekday = " ";
    if (interval == "weekday") {
        weekday = " AND NOT (WEEKDAY(checkin_time) = 5 OR WEEKDAY(checkin_time) = 6)"
    } else if (interval == "weekend") {
        weekday = " AND WEEKDAY(checkin_time) = 5 OR WEEKDAY(checkin_time) = 6";
    }

    let sql = "SELECT hour(Checkin.checkin_time) as checkin_hour, \
    SUM(COUNT(Checkin.id)) as count \
    FROM Checkin, Employee \
    WHERE Employee.gym_id = ? and Employee.id = Checkin.employee_id" + 
    weekday + " GROUP BY checkin_hour";

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
                message: "No Checkin found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    });
}

exports.getHoursCountByGymId = (req, res) => {
    const gym_id = req.query.gym_id;
    const interval = req.query.interval;

    let date = "date(checkin_time)";
    if (interval == "week") {
        date = "DATE(DATE_SUB(checkin_time, INTERVAL WEEKDAY(checkin_time) DAY))"
    } else if (interval == "month") {
        date = "DATE(DATE_SUB(checkin_time, INTERVAL DAYOFMONTH(checkin_time) DAY))"
    }

    let sql = "SELECT " + date + " as time,  \
    SUM(TIMESTAMPDIFF(MINUTE, Checkin.checkin_time, Checkin.checkout_time)) as count \
    FROM Checkin, Employee \
    WHERE Employee.gym_id = ? and Employee.id = Checkin.employee_id and Checkin.checkout_time IS NOT null \
    GROUP BY time";

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
                message: "No checkin found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    });
}

exports.removeEmployee = (req, res) => {
    const employee_id = parseInt(req.query.employee_id);

    let sql = "DELTE FROM Employee WHERE id = ?"

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
                message: "No record with id"
            })
        }
        return res.status(200).send({
            status: "Success"
        })
    })
}