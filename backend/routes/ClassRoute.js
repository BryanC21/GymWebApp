const express = require("express");
const router = express.Router();
const {
    getClasses, getClassById
} = require("../controllers/ClassController");

router.get("/getClasses", getClasses);
router.get("/getClassById", getClassById);

module.exports = router;
