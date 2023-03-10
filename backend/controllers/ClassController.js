const db = require("../db_connection");

exports.getClasses = (req, res) => {
    const gym_id = parseInt(req.query.gym_id)

    let sql = "SELECT activity.id as activity_id, activity.name as activity_name, \
    class.employee_id, class.gym_id, class.start_time, class.duration, class.capacity \
    from class, activity where class.activity_id = activity.id and class.gym_id = ?;"

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
            status: "success",
            results: results
        })
    }
    )
}

exports.getClassById = (req, res) => {
    const class_id = parseInt(req.query.class_id)

    let sql = "SELECT activity.id as activity_id, activity.name as activity_name, \
    class.employee_id, class.gym_id, class.start_time, class.duration, class.capacity, \
    count(enroll.id) as enrolled_number \
    from class, activity, enroll \
    where class.activity_id = activity.id and enroll.class_id = class.id and class.id = ?;"

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
            status: "success",
            results: results[0]
        })
    }
    )
}