const express = require("express");
const router = express.Router();
const {getAllUsers, getUserByID, getByDepartment, getDepartments, editUserByID, getAllLevels, getAllGenders,
	getDepartmentsManagers, 
	getByDepartmentCurrent, getTitles} = require("../controllers/UserController");

router.get("/getAllUsers", getAllUsers);
router.get("/getUserByID", getUserByID);
router.get("/editUserByID", editUserByID);
router.get("/getAllLevels", getAllLevels);
router.get("/getAllGenders", getAllGenders);


router.get("/getByDepartment", getByDepartment);
router.get("/getDepartments", getDepartments);
router.get("/getTitles", getTitles);
router.get("/getDepartmentsManagers", getDepartmentsManagers);
router.get("/getByDepartmentCurrent", getByDepartmentCurrent);

module.exports = router;