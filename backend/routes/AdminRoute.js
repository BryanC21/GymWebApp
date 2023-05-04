const express = require("express");
const employeeAuth = require("../controllers/auth/employeeAuth");
const {
    getAllEmployees, getAllEmployeesByGym, getEmployeeByID, 
    getClassCountByGymId, getEnrollCountByGymId, 
    getMemberCountPerHourByGymId, getMemberCountPerHourByGymIdWithWeek, getHoursCountByGymId, 
} = require("../controllers/AdminController");

const router = express.Router();

router.get("/getAllEmployees", getAllEmployees);
router.get("/getAllEmployeesByGym", getAllEmployeesByGym);
router.get("/getEmployeeByID", getEmployeeByID);
router.get("/getClassCountByGymId", getClassCountByGymId);
router.get("/getEnrollCountByGymId", getEnrollCountByGymId);
router.get("/getMemberCountPerHourByGymId", getMemberCountPerHourByGymId);
router.get("/getMemberCountPerHourByGymIdWithWeek", getMemberCountPerHourByGymIdWithWeek);
router.get("/getHoursCountByGymId", getHoursCountByGymId);

module.exports = router;
