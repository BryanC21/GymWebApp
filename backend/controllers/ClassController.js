const db = require("../db_connection");

exports.getAllClasses = (req, res) => {
    let sql = "SELECT Class.id, Activity.id as activity_id, Activity.name as activity_name, \
    Class.employee_id, Class.gym_id, Class.start_time, Class.duration, Class.capacity - ifnull(enroll.count, 0) as capacity, \
    Class.capacity as full_capacity, \
    Employee.first_name, Employee.last_name, Gym.address \
    FROM Class \
    JOIN Activity ON Activity.id = Class.activity_id \
    JOIN Employee ON Employee.id = Class.employee_id \
    JOIN Gym ON Gym.id = Class.gym_id \
    LEFT JOIN (select count(*) as count, class_id from Enroll group by class_id) as enroll ON Class.id = enroll.class_id;"
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

exports.getAllClassesExceptUserId = (req, res) => {
    const user_id = parseInt(req.query.user_id);

    let sql = "SELECT Class.id, Activity.id as activity_id, Activity.name as activity_name, \
    Class.employee_id, Class.gym_id, Class.start_time, Class.duration, Class.capacity - IFNULL(enroll.count, 0) as capacity, \
    Class.capacity as full_capacity, \
    Employee.first_name, Employee.last_name, Gym.address \
    FROM Class \
    JOIN Activity ON Activity.id = Class.activity_id \
    JOIN Employee ON Employee.id = Class.employee_id \
    JOIN Gym ON Gym.id = Class.gym_id \
    LEFT JOIN (SELECT COUNT(*) as count, class_id FROM Enroll GROUP BY class_id) as enroll ON Class.id = enroll.class_id \
    LEFT JOIN (SELECT class_id FROM Enroll WHERE user_id = ?) as user_class ON user_class.class_id = Class.id \
    WHERE user_class.class_id IS NULL and Class.start_time > CURRENT_TIMESTAMP() \
    GROUP BY Class.id, Activity.id, Employee.id, Gym.id, Employee.first_name, Employee.last_name, Gym.address;"
    db.query(sql, [user_id], (err, results) => {
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

    let sql = "SELECT Class.id, Activity.id as activity_id, Activity.name as activity_name, \
    Class.employee_id, Class.gym_id, Class.start_time, Class.duration, Class.capacity - ifnull(enroll.count, 0) as capacity, \
    Class.capacity as full_capacity, \
    Employee.first_name, Employee.last_name, Gym.address \
    FROM Class \
    JOIN Activity ON Activity.id = Class.activity_id \
    JOIN Employee ON Employee.id = Class.employee_id \
    JOIN Gym ON Gym.id = Class.gym_id \
    LEFT JOIN (SELECT COUNT(*) as count, class_id FROM Enroll GROUP BY class_id) as enroll ON Class.id = enroll.class_id \
    WHERE Class.gym_id = ? \
    GROUP BY Class.id, Activity.id, Employee.id, Gym.id, Employee.first_name, Employee.last_name, Gym.address;"
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

    let sql = "SELECT Class.id, Activity.id as activity_id, Activity.name as activity_name, \
    Class.employee_id, Class.gym_id, Class.start_time, Class.duration, Class.capacity - ifnull(enroll.count, 0) as capacity, \
    Class.capacity as full_capacity, \
    Employee.first_name, Employee.last_name, Gym.address \
    FROM Class \
    JOIN Activity ON Activity.id = Class.activity_id \
    JOIN Employee ON Employee.id = Class.employee_id \
    JOIN Gym ON Gym.id = Class.gym_id WHERE Class.id = ? \
    LEFT JOIN (select count(*) as count, class_id from Enroll group by class_id) as enroll ON Class.id = enroll.class_id \
    WHERE Class.start_time > CURRENT_TIMESTAMP();"

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

exports.getClassesByUserId = (req, res) => {
    const user_id = parseInt(req.query.user_id);

    let sql = "SELECT Class.id, Activity.id as activity_id, Activity.name as activity_name, \
    Class.employee_id, Class.gym_id, Class.start_time, Class.duration, Class.capacity - IFNULL(Enroll.count, 0) as capacity, \
    Class.capacity as full_capacity, \
    Employee.first_name, Employee.last_name, gym.address \
    FROM Class \
    JOIN Activity ON Class.activity_id = Activity.id \
    JOIN gym ON Class.gym_id = gym.id \
    JOIN Employee ON Class.employee_id = Employee.id \
    LEFT JOIN (SELECT class_id, COUNT(*) as count FROM Enroll WHERE user_id = ? GROUP BY class_id) as Enroll ON Class.id = enroll.class_id \
    WHERE Enroll.class_id = Class.id and Class.start_time > CURRENT_TIMESTAMP();"
    db.query(sql, [user_id], (err, results) => {
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

exports.removeClass = (req, res) => {
    const class_id = parseInt(req.query.class_id);

    let sql = "DELTE FROM Class WHERE id = ?"

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
                message: "No record with id"
            })
        }
        return res.status(200).send({
            status: "Success"
        })
    })
}