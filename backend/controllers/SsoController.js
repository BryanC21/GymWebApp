require('dotenv').config();
const db = require("../db_connection");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.userSignin = (req, res) => {
    const email = req.query.email;
    const password = crypto.createHash('md5').update(req.query.password).digest("hex");
    let sql = "SELECT User.id, User.first_name, User.last_name, User.phone, User.email, User.gender_id, \
    User.create_time, User.level_id, Level.name as level, Gender.name as gender \
    FROM User, Level, Gender \
    where User.level_id = level.id and User.gender_id = Gender.id and user.email=? and user.password=?";

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "Email or password wrong"
            })
        }
        let result = Object.values(JSON.parse(JSON.stringify(results)))[0];
        const token = jwt.sign(
            result,
            process.env.USER_TOKEN_KEY,
            {expiresIn: "24h",}
        )
        if (result.level_id == 3) {
            let sql1 = "UPDATE User SET level_id = 4 WHERE id = ? and (SELECT expire_time FROM Expire where user_id = ? ORDER BY expire_time DESC LIMIT 1) < CURRENT_TIMESTAMP";
            db.query(sql1, [result.id, result.id], (err, results) => {
                if (err) {
                    return res.status(401).send({
                        status: "update level error",
                        message: err
                    })
                }
                if (results.length === 0) {
                    return res.status(404).send({
                        status: "error",
                        message: "No expiration find"
                    })
                }
                result.level_id = 4;
                return res.status(200).send({
                    status: "success",
                    results: result,
                    token: token
                })
            });
        } else {
            return res.status(200).send({
                status: "success",
                results: result,
                token: token
            })
        }
    })
}

exports.employeeSignin = (req, res) => {
    const email = req.query.email;
    const password = crypto.createHash('md5').update(req.query.password).digest("hex");
    let sql = "SELECT Employee.id, Employee.first_name, Employee.last_name, Employee.phone, \
    Employee.email, Employee.gender_id, Employee.create_time, Employee.level_id, \
    Employee.gym_id, Level.name as level, Gender.name as gender \
    FROM Employee, Level, Gender \
    WHERE Employee.level_id = level.id and Employee.gender_id = Gender.id and \
    Employee.email=? and Employee.password=?"

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "Email or password wrong"
            })
        }
        let result = Object.values(JSON.parse(JSON.stringify(results)))[0];
        const token = jwt.sign(
            result,
            process.env.EMPLOYEE_TOKEN_KEY,
            {expiresIn: "2h",}
        )

        return res.status(200).send({
            status: "success",
            results: results[0],
            token: token
        })
    })
}
