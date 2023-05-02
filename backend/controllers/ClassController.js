const db = require("../db_connection");

exports.getAllClasses = (req, res) => {
    let sql = "SELECT class.id, activity.id as activity_id, activity.name as activity_name, \
    class.employee_id, class.gym_id, class.start_time, class.duration, class.capacity, \
    employee.first_name, employee.last_name, gym.address \
    FROM class \
    JOIN activity ON activity.id = class.activity_id \
    JOIN employee ON employee.id = class.employee_id \
    JOIN gym ON gym.id = class.gym_id;"
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
                message: "No Classes found for this gym"
            })
        }
        return res.status(200).send({
            status: "Success",
            results: results
        })
    }
    )
}

exports.getClassesByGym = (req, res) => {
    const gym_id = parseInt(req.query.gym_id);

    let sql = "SELECT class.id, activity.id as activity_id, activity.name as activity_name, \
    class.employee_id, class.gym_id, class.start_time, class.duration, class.capacity \
    employee.first_name, employee.last_name, gym.address \
    FROM class \
    WHERE class.gym_id = ? \
    JOIN activity ON activity.id = class.activity_id \
    JOIN employee ON employee.id = class.employee_id \
    JOIN gym ON gym.id = class.gym_id;"
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
                message: "No Classes found for this gym"
            })
        }
        return res.status(200).send({
            status: "Success",
            results: results
        })
    }
    )
}

exports.getClassById = (req, res) => {
    const class_id = parseInt(req.query.class_id);

    let sql = "SELECT class.id, activity.id as activity_id, activity.name as activity_name, \
    class.employee_id, class.gym_id, class.start_time, class.duration, class.capacity \
    employee.first_name, employee.last_name, gym.address \
    FROM class \
    WHERE class.id = ? \
    JOIN activity ON activity.id = class.activity_id \
    JOIN employee ON employee.id = class.employee_id \
    JOIN gym ON gym.id = class.gym_id;"

    db.query(sql, [class_id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No Classes found for this gym"
            })
        }
        return res.status(200).send({
            status: "Success",
            results: results[0]
        })
    }
    )
}


exports.addActivity = (req, res) => {
    const activity_name = req.query.activity_name;

    let sql = "INSERT INTO Activity (name) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [activity_name], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "Add Activity failed"
            })
        }
        return res.status(200).send({
            status: "Success",
            results: results
        })
    });
}

exports.addClass = (req, res) => {
    const activity_id = req.query.activity_id;
    const employee_id = req.query.employee_id;
    const gym_id = req.query.gym_id;
    const start_time = req.query.start_time;
    const duration = req.query.duration;
    const capacity = req.query.capacity;

    let sql = "INSERT INTO Class (activity_id, employee_id, gym_id, start_time, duration, \
    capacity) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [activity_id, employee_id, gym_id, start_time, duration, capacity], (err, results) => {
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
            status: "Success",
            results: results
        })
    });
}

exports.enrollClass = (req, res) => {
    const class_id = parseInt(req.query.class_id);
    const user_id = parseInt(req.query.user_id);

    let sql = "INSERT INTO Enroll (class_id, user_id) values(?, ?)"

    db.query(sql, [class_id, user_id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No Classes found for this gym"
            })
        }
        return res.status(200).send({
            status: "Success",
            results: results
        })
    })
}