const jwt = require("jsonwebtoken")

const SECRET = process.env.JWT_SECRET || "fallback-secret"

const signToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" })
}

const verifyToken = (token) => {
  return jwt.verify(token, SECRET)
}

module.exports = { signToken, verifyToken }
