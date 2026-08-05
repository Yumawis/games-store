const User = require("../models/User")
const { comparePassword } = require("../utils/passwordHash")
const { signToken } = require("../utils/jwt")
const { validateRegister, validateLogin } = require("../validators/authValidator")

const register = async (req, res) => {
  try {
    const errors = validateRegister(req.body)

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        data: { message: "Datos inválidos", errors },
      })
    }

    const { names, lastNames, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({
        data: { message: "El correo electrónico ya está registrado" },
      })
    }

    const newUser = await User.create({ names, lastNames, email, password })

    const result = {
      _id: newUser._id,
      names: newUser.names,
      lastNames: newUser.lastNames,
      email: newUser.email,
      createdAt: newUser.createdAt,
    }

    return res.status(201).json({
      data: { message: "Usuario registrado correctamente", result },
    })
  } catch (error) {
    return res.status(420).json({
      data: { message: "Error al registrar el usuario", error: error.message },
    })
  }
}

const login = async (req, res) => {
  try {
    const errors = validateLogin(req.body)

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        data: { message: "Datos inválidos", errors },
      })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return res.status(401).json({
        data: { message: "Credenciales inválidas" },
      })
    }

    const isMatch = await comparePassword(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        data: { message: "Credenciales inválidas" },
      })
    }

    const token = signToken({ id: user._id, email: user.email })

    const result = {
      token,
      user: {
        _id: user._id,
        names: user.names,
        lastNames: user.lastNames,
        email: user.email,
        createdAt: user.createdAt,
      },
    }

    return res.status(200).json({
      data: { message: "Inicio de sesión exitoso", result },
    })
  } catch (error) {
    return res.status(420).json({
      data: { message: "Error al iniciar sesión", error: error.message },
    })
  }
}

module.exports = { register, login }
