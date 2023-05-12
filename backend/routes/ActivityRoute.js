const express = require("express");
const userAuth = require("../controllers/auth/userAuth");
const employeeAuth = require("../controllers/auth/employeeAuth");
const {
    getAllActivity, getActivityById, getActivityByInterval, removeActivity
} = require("../controllers/ActivityController");

const router = express.Router();

router.get("/getAllActivity", getAllActivity);
router.get("/getActivityById", getActivityById);
router.get("/getActivityByInterval", userAuth, getActivityByInterval);
router.get("/removeActivity", employeeAuth, removeActivity);

module.exports = router;
