const router = require("express").Router();
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const transactionRoutes = require("./transactionRoutes");

router.use(categoryRoutes);
router.use(userRoutes);
router.use(transactionRoutes);

module.exports = router;