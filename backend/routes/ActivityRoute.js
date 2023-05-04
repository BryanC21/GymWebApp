const express = require("express");
const router = express.Router();
const {
    getAllActivity, getActivityById, getActivityByDays
} = require("../controllers/ActivityController");

router.get("/getAllActivity", getAllActivity);
router.get("/getActivityById", getActivityById);
//router.get("/getActivityByDays", getActivityByDays);
module.exports = router;
