const express = require("express");
const userAuth = require("../controllers/auth/userAuth");
const employeeAuth = require("../controllers/auth/employeeAuth");
const {
	getAllUsers, getUserByID, editUserByID, getAllLevels, getAllGenders, enrollUser, checkinUser, checkoutUser
} = require("../controllers/UserController");

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUserByID", getUserByID);
router.get("/editUserByID", editUserByID);
router.get("/getAllLevels", getAllLevels);
router.get("/getAllGenders", getAllGenders);
router.get("/enrollUser", enrollUser);
router.get("/checkinUser", checkinUser);
router.get("/checkoutUser", checkoutUser);

module.exports = router;