const EMAIL_REGEX = /^\S+@\S+\.\S+$/

const validateRegister = (body) => {
  if (!body.names || !body.names.trim()) return { names: "El nombre es obligatorio" }

  if (!body.lastNames || !body.lastNames.trim()) return { lastNames: "Los apellidos son obligatorios" }

  if (!body.email || !body.email.trim()) return { email: "El email es obligatorio" }

  if (!EMAIL_REGEX.test(body.email)) return { email: "El email debe ser un correo válido" }

  if (!body.password) return { password: "La contraseña es obligatoria" }

  if (body.password.length < 6) return { password: "La contraseña debe tener al menos 6 caracteres" }

  return {}
}

const validateLogin = (body) => {
  if (!body.email || !body.email.trim()) return { email: "El email es obligatorio" }

  if (!EMAIL_REGEX.test(body.email)) return { email: "El email debe ser un correo válido" }

  if (!body.password) return { password: "La contraseña es obligatoria" }

  return {}
}

module.exports = { validateRegister, validateLogin }
