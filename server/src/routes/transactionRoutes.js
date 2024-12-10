const routes = require("express").Router();
const transactionService = require("../services/transactionService");

routes.post("/transactions", (req, res) => {});
routes.get("/transactions", (req, res) => {})
routes.put("/transactions/:id", (req, res) => {});
routes.delete("/transactions/:id", (req, res) => {});

module.exports = routes;