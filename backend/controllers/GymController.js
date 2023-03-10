const db = require("../db_connection");

exports.getAllGyms = (req, res) => {
    let sql = "SELECT gym.id, location.city, location.state, location.country, gym.address FROM gym, location \
    WHERE gym.location_id = location.id";

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
                message: "No Gyms found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    }
    )
}

exports.getGymById = (req, res) => {
    const gym_id = parseInt(req.query.gym_id)

    let sql = "SELECT gym.id, location.city, location.state, location.country, gym.address FROM gym, location \
    WHERE gym.location_id = location.id and gym.id = ?";

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
                message: "No Gym found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results[0]
        })
    }
    )
}
