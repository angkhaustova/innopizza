const router = require("express").Router();
const models = require("../models");

router
  .get("/", function (req, res) {
    models.Pizza.findAll().then(function (data) {
      res.send(data);
    });
  })
  .post("/", function (req, res, next) {
    models.Pizza.create({
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
    })
      .then(function () {
        res.sendStatus(200);
      })
      .catch(function (error) {
        return next(error);
      });
  });

router
  .get("/:id", function (req, res) {
    models.Pizza.findByPk(req.params.id).then(function (data) {
      if (data) {
        res.send(data);
      } else {
        res.sendStatus(404);
      }
    });
  })
  .put("/:id", function (req, res) {
    models.Pizza.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(function (data) {
      if (data[0]) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
  })
  .delete("/:id", function (req, res) {
    models.Pizza.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (data) {
      if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
  });

module.exports = router;
