const routes = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const authService = require("../services/authService")

routes.post("/register", authService.auth);
routes.post("/change-password", authMiddleware, authService.changePassword);
routes.get("/login", authService.login);
routes.get("/me", authMiddleware, authService.me)

module.exports = routes;