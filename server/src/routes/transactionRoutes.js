const routes = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const transactionService = require("../services/transactionService");

routes.post("/transactions", authMiddleware, transactionService.postTransaction);
routes.get("/transactions", authMiddleware, transactionService.getTransactions)
routes.put("/transactions/:transactionID", authMiddleware, (req, res) => {res.status(200).json({message: "successfull"})});
routes.delete("/transactions/:transactionID", authMiddleware, transactionService.deleteTransaction);

module.exports = routes;