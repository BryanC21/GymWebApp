const express = require("express");
const router = express.Router();
const {
    getAllGyms, getGymById
} = require("../controllers/GymController");

router.get("/getAllGyms", getAllGyms);
router.get("/getGymById", getGymById);

module.exports = router;
