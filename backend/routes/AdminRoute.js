const express = require("express");
const router = express.Router();
const {
    getAllEmployees, getAllEmployeesByGym, getEmployeeByID, enrollUser, editUserByID, checkinUser
} = require("../controllers/AdminController");

router.get("/getAllEmployees", getAllEmployees);
router.get("/getAllEmployeesByGym", getAllEmployeesByGym);
router.get("/getEmployeeByID", getEmployeeByID);
router.get("/enrollUser", enrollUser);
router.get("/editUserByID", editUserByID);
router.get("/checkinUser", checkinUser);

module.exports = router;
