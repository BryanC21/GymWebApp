const express = require("express");
const {
    userSignin, employeeSignin, verifyToken
} = require("../controllers/SsoController");

const router = express.Router();

router.get("/userSignin", userSignin);
router.get("/employeeSignin", employeeSignin);
router.get("/verifyToken", verifyToken);

module.exports = router;
