const db = require("../db_connection");
const crypto = require("crypto");

exports.getAllUsers = (req, res) => {
    let sql = "SELECT User.id, User.first_name, User.last_name, User.phone, User.email, User.gender_id, \
    User.create_time, User.level_id, Level.name as level, Gender.name as gender \
    FROM User, Level, Gender \
    where User.level_id = Level.id and User.gender_id = Gender.id";

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
    User.create_time, User.level_id, Level.name as level, Gender.name as gender, Expire.id as Expire_id \
    FROM User, Level, Gender, Expire \
    where User.id = ? and User.level_id = Level.id and User.gender_id = Gender.id and Expire.user_id = User.id";

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

exports.searchUserByName = (req, res) => {
    const pattern = req.query.pattern;

    let sql = "SELECT User.id, User.first_name, User.last_name, User.phone, User.email, User.gender_id, \
    User.create_time, User.level_id, Level.name as level, Gender.name as gender \
    FROM User, Level, Gender \
    where User.level_id = Level.id and User.gender_id = Gender.id and \
    (User.first_name LIKE ? OR User.last_name LIKE ?)";

    db.query(sql, [pattern, pattern], (err, results) => {
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
    const gender_id = parseInt(req.query.gender_id);
    const level_id = 3;
    const duration = req.query.duration;
    const password = crypto.createHash('md5').update(req.query.password).digest("hex");

    let sql = "INSERT INTO USER (first_name, last_name, phone, email, gender_id, \
    level_id, password) VALUES (?, ?, ?, ?, ?, ?, ?)";

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
        let user_id = results.insertId;
        if (duration) {
            Date.prototype.addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }
            let date = new Date();
            let expire_time = date.addDays(duration);

            let sql = "INSERT INTO Expire (user_id, expire_time) VALUES (?, ?)";

            db.query(sql, [user_id, expire_time], (err, results) => {
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
                
            });
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

    let sql = "INSERT INTO Checkin (user_id, employee_id) VALUES (?, ?)";

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
                message: "Checkin failed"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    });
}

exports.checkoutUser = (req, res) => {
    const checkin_id = req.query.checkin_id;

    let sql = "UPDATE Checkin SET checkout_time = CURRENT_TIMESTAMP WHERE id = ?";

    db.query(sql, [checkin_id], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "Checkout failed"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    });
}

exports.getCheckinByUserId = (req, res) => {
    const user_id = req.query.user_id;

    let sql = "SELECT * FROM Checkin WHERE user_id = ? ORDER BY checkin_time DESC LIMIT 1";

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
                message: "No checkin found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results[0]
        })
    });
}

exports.removeUser = (req, res) => {
    const user_id = parseInt(req.query.user_id);

    let sql = "DELTE FROM User WHERE id = ?"

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
                message: "No record with id"
            })
        }
        return res.status(200).send({
            status: "Success"
        })
    })
}

exports.logHours = (req, res) => {
    const user_id = parseInt(req.query.user_id);
    const activity_id = parseInt(req.query.activity_id);
    const duration = parseInt(req.query.duration);

    let sql = "INSERT INTO Log (user_id, activity_id, duration) VALUES (?, ?, ?)";

    db.query(sql, [user_id, activity_id, duration], (err, results) => {
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