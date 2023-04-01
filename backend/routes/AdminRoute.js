const express = require("express");
const employeeAuth = require("../controllers/auth/employeeAuth");
const {
    getAllEmployees, getAllEmployeesByGym, getEmployeeByID
} = require("../controllers/AdminController");

const router = express.Router();

router.get("/getAllEmployees", employeeAuth, getAllEmployees);
router.get("/getAllEmployeesByGym", employeeAuth, getAllEmployeesByGym);
router.get("/getEmployeeByID", employeeAuth, getEmployeeByID);

module.exports = router;
