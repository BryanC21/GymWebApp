const express = require("express");
const router = express.Router();
const {
    getAllClasses, getClassById, getClassesByGym
} = require("../controllers/ClassController");

router.get("/getAllClasses", getAllClasses);
router.get("/getClassById", getClassById);
router.get("/getClassesByGym", getClassesByGym);

module.exports = router;
