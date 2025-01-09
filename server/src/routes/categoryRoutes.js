const routes = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const categoryService = require("../services/categoryService");

routes.post("/categories", authMiddleware, (req, res) => {});
routes.get("/categories", authMiddleware, (req, res) => {})
routes.put("/categories/:id", authMiddleware,  (req, res) => {});
routes.delete("/categories/:id", authMiddleware,  (req, res) => {});

module.exports = routes;