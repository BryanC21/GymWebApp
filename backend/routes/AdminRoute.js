const express = require("express");
const employeeAuth = require("../controllers/auth/employeeAuth");
const {
    getAllEmployees, getAllEmployeesByGym, getEmployeeByID, 
    getClassCountByGymId, getEnrollCountByGymId, 
    getMemberCountPerHourByGymId, getHoursCountByGymId, 
} = require("../controllers/AdminController");

const router = express.Router();

router.get("/getAllEmployees", employeeAuth, getAllEmployees);
router.get("/getAllEmployeesByGym", employeeAuth, getAllEmployeesByGym);
router.get("/getEmployeeByID", employeeAuth, getEmployeeByID);
router.get("/getClassCountByGymId", employeeAuth, getClassCountByGymId);
router.get("/getEnrollCountByGymId", employeeAuth, getEnrollCountByGymId);
router.get("/getMemberCountPerHourByGymId", employeeAuth, getMemberCountPerHourByGymId);
router.get("/getHoursCountByGymId", employeeAuth, getHoursCountByGymId);

module.exports = router;
