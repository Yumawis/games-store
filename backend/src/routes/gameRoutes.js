const express = require("express");
const router = express.Router();

const { createGame, getAllGames } = require("../controllers/gameController");

router.post("/create", createGame);
router.get("/", getAllGames);

module.exports = router;
