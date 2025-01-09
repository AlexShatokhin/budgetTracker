const routes = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const categoryService = require("../services/categoryService");

routes.post("/categories", authMiddleware, categoryService.createCategory);
routes.get("/categories", authMiddleware, categoryService.getCategories)
routes.put("/categories/:id", authMiddleware, categoryService.updateCategory);
routes.delete("/categories/:id", authMiddleware, categoryService.deleteCategory);

module.exports = routes;