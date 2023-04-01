const db = require("../db_connection");

exports.getAllUsers = (req, res) => {
    let sql = "SELECT User.id, User.first_name, User.last_name, User.phone, User.email, User.gender_id, \
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

    let sql = "SELECT User.id, User.first_name, User.last_name, User.phone, User.email, User.gender_id, \
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

exports.editUserByID = (req, res) => {
    const id = req.query.id
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const gender_id = req.query.gender
    const email = req.query.email
    const phone = req.query.phone
    const password = crypto.createHash('md5').update(req.query.password).digest("hex");
    const level_id = req.query.level_id

    let sql = "UPDATE User SET first_name = ?, last_name = ?, gender_id = ?, email = ?, phone = ?, \
    password = ?, level_id = ? \
    WHERE id = ?"

    db.query(sql, [first_name, last_name, gender_id, email, phone, password, level_id, id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No user found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
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

exports.enrollUser = (req, res) => {
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const phone = req.query.phone;
    const email = req.query.email;
    const gender_id = req.query.gender_id;
    const level_id = req.query.level_id;
    const password = crypto.createHash('md5').update(req.query.password).digest("hex");

    let sql = "INSER INTO USER (first_name, last_name, phone, email, gender_id, \
    level_id, passwrod) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [first_name, last_name, phone, email, gender_id, level_id, 
        password], (err, results) => {
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
            status: "success",
            results: results
        })
    });
}

exports.checkinUser = (req, res) => {
    const user_id = req.query.user_id;
    const employee_id = req.query.employee_id;

    let sql = "INSER INTO Checkin (user_id, employee_id) VALUES (?, ?)";

    db.query(sql, [user_id, employee_id], (err, results) => {
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
            status: "success",
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