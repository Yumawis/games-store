const CATEGORY = require("../constants/category")
const CATEGORIES = Object.values(CATEGORY)

const validateCreateGame = (body) => {
  if (!body.name || !body.name.trim()) {
    return { name: "El nombre es obligatorio" }
  }

  if (!body.creationDate) {
    return { creationDate: "La fecha de creación es obligatoria" }
  }

  if (!body.categoryType) {
    return { categoryType: "La categoría es obligatoria" }
  }

  if (!CATEGORIES.includes(body.categoryType)) {
    return { categoryType: "La categoría debe ser una de: Deportes, Terror, Aventura" }
  }

  return {}
}

module.exports = { validateCreateGame }
