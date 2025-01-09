const routes = require("express").Router();
const authService = require("../services/authService")

routes.post("/register", authService.auth);
routes.get("/login", authService.login);

module.exports = routes;