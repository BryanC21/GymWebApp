const express = require("express");
const router = express.Router();
const {
    getAllEmployees, getEmployeeByID, enrollUser, editUserByID, editSalary, getAllEmployeesCurrent, getEmployeesCurrentSorted,
    addEmpDept, removeEmpDept, addEmpTitle, removeEmpTitle, addDepartment, editDepartment, deleteDepartment, editDeptManager,
    addDeptManager, removeDeptManager
} = require("../controllers/AdminController");

router.get("/getAllEmployees", getAllEmployees);
router.get("/getEmployeeByID", getEmployeeByID);
router.get("/enrollUser", enrollUser);
router.get("/editUserByID", editUserByID);
router.get("/checkinUser", checkinUser);
router.get("/getAllEmployeesCurrent", getAllEmployeesCurrent);
router.get("/getEmployeesCurrentSorted", getEmployeesCurrentSorted);
router.get("/addEmpDept", addEmpDept);
router.get("/removeEmpDept", removeEmpDept);
router.get("/addEmpTitle", addEmpTitle);
router.get("/removeEmpTitle", removeEmpTitle);
router.get("/addDepartment", addDepartment);
router.get("/editDepartment", editDepartment);
router.get("/deleteDepartment", deleteDepartment);
router.get("/editDeptManager", editDeptManager);
router.get("/addDeptManager", addDeptManager);
router.get("/removeDeptManager", removeDeptManager);

module.exports = router;
