const router = require("express").Router();
const pizzasRoutes = require("./pizzas");

router.use("/api/pizzas", pizzasRoutes);

module.exports = router;
