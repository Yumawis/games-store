const Game = require("../models/Game");
const { validateCreateGame } = require("../validators/gameValidator");

const createGame = async (req, res) => {
  try {
    const errors = validateCreateGame(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        data: { message: "Datos inválidos", errors },
      });
    }

    const { name, creationDate, categoryType, imageBase64 } = req.body;

    const existingGame = await Game.findOne({ name });

    if (existingGame) {
      return res.status(400).json({
        data: { message: "Este juego ya existe" },
      });
    }

    const newGame = new Game({ name, creationDate, categoryType, imageBase64 });

    console.log(newGame);

    const savedGame = await newGame.save();

    const response = {
      data: {
        message: "Juego creado correctamente",
        result: savedGame,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.message;

    const response = {
      data: {
        message: "Error al crear el juego",
        error: errorMessage,
      },
    };

    return res.status(420).json(response);
  }
};

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();

    const response = {
      data: {
        message: "Juegos obtenidos correctamente",
        result: games,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.message;

    const response = {
      data: {
        message: "Error al obtener los juegos",
        error: errorMessage,
      },
    };

    return res.status(420).json(response);
  }
};

module.exports = { createGame, getAllGames };
