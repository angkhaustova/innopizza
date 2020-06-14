const router = require("express").Router();
const pizzasRoutes = require("./pizzas");
const ordersRoutes = require("./orders");
const path = require("path");

router.use("/api/pizzas", pizzasRoutes);
router.use("/api/orders", ordersRoutes);

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
