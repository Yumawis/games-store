const { verifyToken } = require("../utils/jwt")

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        data: { message: "Token no proporcionado" },
      })
    }

    const token = header.split(" ")[1]
    const decoded = verifyToken(token)

    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      data: { message: "Token inválido o expirado", error: error.message },
    })
  }
}

module.exports = auth
