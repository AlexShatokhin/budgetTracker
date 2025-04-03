const routes = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const transactionService = require("../services/transactionService");

routes.get("/transactions", authMiddleware, transactionService.getTransactions)
routes.get("/transactions/latest", authMiddleware, transactionService.getLatestTransactions)
routes.get("/transactions/monthly", authMiddleware, transactionService.getMonthlyTransactions)
routes.get("/transactions/amounts", authMiddleware, transactionService.getAmountsByCategory)
routes.get("/transactions/grouped", authMiddleware, transactionService.getTransactionByCategory)
routes.get("/transactions/category/:categoryID", authMiddleware, transactionService.getTransactionByCategoryId)

routes.post("/transactions", authMiddleware, transactionService.postTransaction);
routes.put("/transactions/:transactionID", authMiddleware, transactionService.updateTransaction);
routes.delete("/transactions/:transactionID", authMiddleware, transactionService.deleteTransaction);

module.exports = routes;