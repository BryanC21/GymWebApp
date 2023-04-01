const express = require("express");
const {
    userSignin, employeeSignin
} = require("../controllers/SsoController");

const router = express.Router();

router.get("/userSignin", userSignin);
router.get("/employeeSignin", employeeSignin);

module.exports = router;
