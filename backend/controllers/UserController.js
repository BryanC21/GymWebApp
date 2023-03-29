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

exports.getByDepartment = (req, res) => {

    const dept = req.query.dept
    const count = parseInt(req.query.count)
    const offset = parseInt(req.query.offset)

    let sql = "SELECT employees.emp_no, first_name, last_name, titles.title FROM employees \
    JOIN current_dept_emp ON current_dept_emp.emp_no = employees.emp_no \
    LEFT JOIN titles ON titles.emp_no = employees.emp_no \
    WHERE dept_no = ? ORDER BY EMP_NO DESC LIMIT ? OFFSET ?"

    db.query(sql, [dept, count, offset], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No employees found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    }
    )
}

exports.getByDepartmentCurrent = (req, res) => {

    const dept = req.query.dept
    const count = parseInt(req.query.count)
    const offset = parseInt(req.query.offset)

    let sql = "SELECT employees.emp_no, first_name, last_name, titles.title FROM employees \
    JOIN current_dept_emp ON current_dept_emp.emp_no = employees.emp_no \
    LEFT JOIN titles ON titles.emp_no = employees.emp_no \
    WHERE dept_no = ? AND current_dept_emp.to_date = '9999-01-01' ORDER BY EMP_NO DESC LIMIT ? OFFSET ?"

    db.query(sql, [dept, count, offset], (err, results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No employees found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    }
    )
}

exports.getDepartmentsManagers = (req, res) => {

    let sql = "SELECT departments.dept_no, departments.dept_name, employees.first_name, employees.last_name, employees.emp_no, \
    titles.title FROM departments \
    JOIN dept_manager ON dept_manager.dept_no = departments.dept_no \
    JOIN employees ON employees.emp_no = dept_manager.emp_no \
    JOIN titles ON titles.emp_no = dept_manager.emp_no \
    WHERE dept_manager.to_date = '9999-01-01' AND titles.title = 'Manager'"

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
                message: "No departments found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

exports.getDepartments = (req, res) => {

    let sql = "SELECT * FROM departments"
    
    db.query(sql, (err ,results) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        }
        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No departments found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}

exports.getTitles = (req, res) => {
    let sql = "SELECT DISTINCT title from titles";
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
                message: "No titles found"
            })
        }
        return res.status(200).send({
            status: "success",
            results: results
        })
    })
}
