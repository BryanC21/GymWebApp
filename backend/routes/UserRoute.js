const express = require("express");
const userAuth = require("../controllers/auth/userAuth");
const employeeAuth = require("../controllers/auth/employeeAuth");
const {
	getAllUsers, getUserByID, editUserByID, getAllLevels, getAllGenders, enrollUser, checkinUser, checkoutUser
} = require("../controllers/UserController");

const router = express.Router();

router.get("/getAllUsers", employeeAuth, getAllUsers);
router.get("/getUserByID", userAuth, getUserByID);
router.get("/editUserByID", employeeAuth, editUserByID);
router.get("/getAllLevels", getAllLevels);
router.get("/getAllGenders", getAllGenders);
router.get("/enrollUser", employeeAuth, enrollUser);
router.get("/checkinUser", employeeAuth, checkinUser);
router.get("/checkoutUser", employeeAuth, checkoutUser);

module.exports = router;