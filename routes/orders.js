const router = require("express").Router();
const models = require("../models");

router
  .get("/", function (req, res) {
    models.Order.findAll().then(function (data) {
      res.send(data);
    });
  })
  .post("/", async function (req, res, next) {
    try {
      const { firstName, lastName, address, email, items } = req.body;

      const user = (
        await models.User.findCreateFind({
          where: { email },
          defaults: {
            firstName,
            lastName,
          },
        })
      )[0];

      const order = await models.Order.create({
        userId: user.dataValues.id,
        address,
      });

      const promises = items.map(([pizzaId, quantity]) =>
        models.OrderPizzas.create({
          orderId: order.dataValues.id,
          pizzaId,
          quantity,
        })
      );

      await Promise.all(promises);

      return res.send({ id: order.dataValues.id });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  });

module.exports = router;
