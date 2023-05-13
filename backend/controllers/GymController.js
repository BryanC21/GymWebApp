const db = require("../db_connection");

exports.getAllGyms = (req, res) => {
    let sql = "SELECT Gym.id, Gym.location_id, Location.city, Location.state, Location.country, Gym.address \
    FROM Gym, Location \
    WHERE Gym.location_id = Location.id";

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
    })
}

exports.getGymById = (req, res) => {
    const gym_id = parseInt(req.query.gym_id)

    let sql = "SELECT Gym.id, Gym.location_id, Location.city, Location.state, Location.country, Gym.address \
    FROM Gym, Location \
    WHERE Gym.location_id = Location.id and Gym.id = ?";

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

exports.removeGym = (req, res) => {
    const gym_id = parseInt(req.query.gym_id);

    let sql = "DELTE FROM Gym WHERE id = ?"

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
                message: "No Gym with id"
            })
        }
        return res.status(200).send({
            status: "Success"
        })
    })
}