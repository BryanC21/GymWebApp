const db = require("../db_connection");

exports.getAllActivity = (req, res) => {
    let sql = "SELECT Activity.id, Activity.name \
    FROM Activity"; // \

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
                message: "No Activity found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

exports.getActivityById = (req, res) => {
    const activity_id = parseInt(req.query.activity_id)

    let sql = "SELECT Activity.id, Activity.name \
    FROM Activity WHERE Activity.id = ?";

    db.query(sql, [activity_id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No Activity found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results[0]
        })
    }
    )
}

exports.getActivityByInterval = (req, res) => {
    const activity_interval = req.query.interval;
    const userId = req.query.user_id;

    let sql = "SELECT * from Log where user_id = ?";
    if (activity_interval == "week") {
        sql = "SELECT a.id AS activity_id, a.name AS activity_name, l.id AS log_id, \
        l.user_id, l.create_time, l.duration \
        FROM Log l \
        JOIN Activity a ON l.activity_id = a.id \
        WHERE l.user_id = ? AND l.create_time >= DATE(NOW()) - INTERVAL 7 DAY";
    } else if (activity_interval == "month") {
        sql = "SELECT a.id AS activity_id, a.name AS activity_name, l.id AS log_id, \
        l.user_id, l.create_time, l.duration \
        FROM Log l \
        JOIN Activity a ON l.activity_id = a.id \
        WHERE l.user_id = ? AND l.create_time >= DATE(NOW()) - INTERVAL 1 MONTH";
    } else if (activity_interval == "quarter") {
        sql = "SELECT a.id AS activity_id, a.name AS activity_name, l.id AS log_id, \
        l.user_id, l.create_time, l.duration \
        FROM Log l \
        JOIN Activity a ON l.activity_id = a.id \
        WHERE l.user_id = ? AND l.create_time >= DATE(NOW()) - INTERVAL 90 DAY";
    }

    db.query(sql, [userId], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No Activity found for this user for this interval."
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

exports.removeActivity = (req, res) => {
    const activity_id = parseInt(req.query.activity_id);

    let sql = "DELTE FROM Activity WHERE id = ?"

    db.query(sql, [activity_id], (err, results) => {
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
