const express = require("express");
const userAuth = require("../controllers/auth/userAuth");
const {
    getAllActivity, getActivityById, getActivityByInterval
} = require("../controllers/ActivityController");

const router = express.Router();

router.get("/getAllActivity", getAllActivity);
router.get("/getActivityById", getActivityById);
router.get("/getActivityByInterval", getActivityByInterval);

module.exports = router;
