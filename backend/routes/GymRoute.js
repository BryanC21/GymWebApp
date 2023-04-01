const express = require("express");
const {
    getAllGyms, getGymById
} = require("../controllers/GymController");


const router = express.Router();


router.get("/getAllGyms", getAllGyms);
router.get("/getGymById", getGymById);

module.exports = router;
