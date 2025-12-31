const mongoose = require("mongoose");
const CATEGORY = require("../constants/category");

const gameSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true, unique: true },
  creationDate: { type: String, required: true },
  categoryType: { type: String, enum: Object.values(CATEGORY), required: true },
  imageBase64: { type: String },
});

module.exports = mongoose.model("Game", gameSchema);
