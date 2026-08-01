const mongoose = require("mongoose")
const { hashPassword } = require("../utils/passwordHash")

const userSchema = new mongoose.Schema(
  {
    names: { type: String, trim: true, required: true },
    lastNames: { type: String, trim: true, required: true },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: { type: String, minLength: 6, required: true, select: false },
  },
  { timestamps: true }
)

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password)
  }
})

module.exports = mongoose.model("User", userSchema)
