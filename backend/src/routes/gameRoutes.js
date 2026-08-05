const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const { createGame, getAllGames } = require("../controllers/gameController")

router.post("/create", auth, createGame)
router.get("/", auth, getAllGames)

module.exports = router
