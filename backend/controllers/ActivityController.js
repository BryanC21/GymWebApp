const db = require("../db_connection");

exports.getAllActivity = (req, res) => {
    let sql = "SELECT activity.id, activity.name \
    FROM activity"; // \

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

    let sql = "SELECT activity.id, activity.name \
    FROM activity WHERE activity.id = ?";

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
    const activity_interval = parseInt(req.query.interval)
    const userId = req.user.id


    let sql = ""
    if (activity_interval == "week") {
        sql = "SELECT a.id AS activity_id, a.name AS activity_name, SUM(l.duration)/60 AS total_hours \
                FROM Log l \
                JOIN Activity a ON l.activity_id = a.id \
                WHERE l.user_id = ? AND l.create_time >= DATE(NOW()) - INTERVAL 7 DAY \
                GROUP BY a.id, a.name";
    } else if (interval == "month") {
        sql = "SELECT a.id AS activity_id, a.name AS activity_name, SUM(l.duration)/60 AS total_hours \
                FROM Log l \
                JOIN Activity a ON l.activity_id = a.id \
                WHERE l.user_id = ? AND l.create_time >= DATE(NOW()) - INTERVAL 1 MONTH \
                GROUP BY a.id, a.name";
    } else if (interval == "quarter") {
        sql = "SELECT a.id AS activity_id, a.name AS activity_name, SUM(l.duration)/60 AS total_hours \
                FROM Log l \
                JOIN Activity a ON l.activity_id = a.id \
                WHERE l.user_id = ? AND l.create_time >= DATE(NOW()) - INTERVAL 90 DAY \
                GROUP BY a.id, a.name";
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
            results: results[0]
        })
    }
    )
}
