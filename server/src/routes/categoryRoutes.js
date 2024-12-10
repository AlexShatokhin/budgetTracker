const routes = require("express").Router();
const categoryService = require("../services/categoryService");

routes.post("/categories", (req, res) => {});
routes.get("/categories", (req, res) => {})
routes.put("/categories/:id", (req, res) => {});
routes.delete("/categories/:id", (req, res) => {});

module.exports = routes;