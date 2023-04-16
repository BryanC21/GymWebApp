const express = require("express");
const {
    userSignin, employeeSignin, verifyToken
} = require("../controllers/SsoController");

const router = express.Router();

router.post("/userSignin", userSignin);
router.post("/employeeSignin", employeeSignin);
router.get("/verifyToken", verifyToken);

module.exports = router;
