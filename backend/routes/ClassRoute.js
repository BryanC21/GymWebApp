const express = require("express");
const router = express.Router();
const {
    getAllClasses, getClassById, getClassesByGym, addActivity, addClass, enrollClass
} = require("../controllers/ClassController");

router.get("/getAllClasses", getAllClasses);
router.get("/getClassById", getClassById);
router.get("/getClassesByGym", getClassesByGym);
router.get("/addActivity", addActivity);
router.get("/addClass", addClass);
router.get("/addClass", enrollClass);

module.exports = router;
