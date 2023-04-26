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

exports.getActivityByDays = (req, res) => {
    const activity_days = parseInt(req.query.activity_days)

    let sql = "SELECT Log.id, User.first_name, User.last_name, Log.duration, Log.create_time \
    FROM Log \
    JOIN User ON Log.user_id = User.id \
    WHERE Log.create_time >= DATE_SUB(NOW(), INTERVAL ? DAY)";
    
    db.query(sql, [activity_days], (err, results) => {
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
