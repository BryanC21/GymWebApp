const express = require("express");
const {
    userSignin, employeeSignin, verifyUserToken, verifyEmployeeToken
} = require("../controllers/SsoController");

const router = express.Router();

router.get("/userSignin", userSignin);
router.get("/employeeSignin", employeeSignin);
router.get("/verifyUserToken", verifyUserToken);
router.get("/verifyEmployeeToken", verifyEmployeeToken);

module.exports = router;
