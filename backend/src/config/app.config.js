const { PORT, ALLOWED_CORS } = require("./app.config.json");

const appConfig = {
  port: PORT ?? 4001,
  allowedCors: ALLOWED_CORS ?? [],
};

module.exports = { appConfig };
