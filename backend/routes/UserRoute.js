const express = require("express");
const router = express.Router();
const {getAllUsers, getUserByID, getAllLevels, getAllGenders} = require("../controllers/UserController");

router.get("/getAllUsers", getAllUsers);
router.get("/getUserByID", getUserByID);
router.get("/getAllLevels", getAllLevels);
router.get("/getAllGenders", getAllGenders);

module.exports = router;