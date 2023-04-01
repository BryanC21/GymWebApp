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
