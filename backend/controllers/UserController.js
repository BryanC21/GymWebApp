const db = require("../db_connection");

exports.getAllUsers = (req, res) => {
    let sql = "SELECT User.first_name, User.last_name, User.phone, User.email, User.gender_id, \
    User.create_time, User.level_id, Level.name as level, Gender.name as gender \
    FROM User, Level, Gender \
    where User.level_id = level.id and User.gender_id = Gender.id";

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
                message: "No users found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}   

exports.getUserByID = (req, res) => {
    const user_id = req.query.user_id;

    let sql = "SELECT User.first_name, User.last_name, User.phone, User.email, User.gender_id, \
    User.create_time, User.level_id, Level.name as level, Gender.name as gender \
    FROM User, Level, Gender \
    where User.id = ? and User.level_id = level.id and User.gender_id = Gender.id";

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
                message: "No user found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results[0]
        })
    });
}   


exports.getAllLevels = (req, res) => {
    let sql = "SELECT * from Level";

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
                message: "No Levels found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

exports.getAllGenders = (req, res) => {
    let sql = "SELECT * from Gender";

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
                message: "No Genders found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}
