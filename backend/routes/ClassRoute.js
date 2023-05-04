const express = require("express");
const employeeAuth = require("../controllers/auth/employeeAuth");
const userAuth = require("../controllers/auth/userAuth");
const {
    getAllClasses, getClassById, getClassesByGym, addActivity, addClass, enrollClass, getClassesByUserId
} = require("../controllers/ClassController");

const router = express.Router();

router.get("/getAllClasses", getAllClasses);
router.get("/getClassById", getClassById);
router.get("/getClassesByGym", getClassesByGym);
router.get("/addActivity", employeeAuth, addActivity);
router.get("/addClass", employeeAuth, addClass);
router.get("/enrollClass", userAuth, enrollClass);
router.get("/getClassesByUserId", userAuth, getClassesByUserId);

module.exports = router;
