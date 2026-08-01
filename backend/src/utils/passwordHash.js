const bcrypt = require("bcryptjs")

const { SALT_ROUNDS } = require("../constants/password")

const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS)

const comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword)

module.exports = { hashPassword, comparePassword }
