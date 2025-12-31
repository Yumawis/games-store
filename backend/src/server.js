require("dotenv").config();

const { appConfig } = require("./config/app.config");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const gameRoutes = require("./routes/gameRoutes");

const app = express();

const ALLOWED_CORS = appConfig.allowedCors;
const PORT = appConfig.port;

app.use(
  cors({
    origin: ALLOWED_CORS,
    credentials: true,
  })
);

app.use(express.json());

connectDB();

const prefix = "/api/v1/games-store";

app.use(`${prefix}/games`, gameRoutes);

app.listen(PORT, () => {
  console.log(
    "Servidor iniciado correctamente:",
    `http://localhost:${PORT}${prefix}`,
    ALLOWED_CORS
  );
});
