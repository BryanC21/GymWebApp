const express = require("express");
const employeeAuth = require("../controllers/auth/employeeAuth");
const userAuth = require("../controllers/auth/userAuth");
const {
    getAllClasses, getClassById, getClassesByGym, addActivity, addClass, enrollClass, getClassesByUserId,
    removeClass, getAllClassesExceptUserId
} = require("../controllers/ClassController");

const router = express.Router();

router.get("/getAllClasses", getAllClasses);
router.get("/getClassById", getClassById);
router.get("/getClassesByGym", getClassesByGym);
router.get("/addActivity", addActivity);
router.get("/addClass", addClass);
router.get("/enrollClass", enrollClass);
router.get("/getClassesByUserId", getClassesByUserId);
router.get("/removeClass", removeClass);
router.get("/getAllClassesExceptUserId", getAllClassesExceptUserId);

module.exports = router;
