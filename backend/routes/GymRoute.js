const express = require("express");
const {
    getAllGyms, getGymById, removeGym
} = require("../controllers/GymController");


const router = express.Router();


router.get("/getAllGyms", getAllGyms);
router.get("/getGymById", getGymById);
router.get("/removeGym", removeGym);

module.exports = router;
