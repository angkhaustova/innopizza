const router = require("express").Router();
const pizzasRoutes = require("./pizzas");
const path = require("path");

router.use("/api/pizzas", pizzasRoutes);

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

module.exports = router;
