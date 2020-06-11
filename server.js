require("dotenv").config();

const routes = require("./routes");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(routes);

// Error handlers
app.use(function (err, req, res, next) {
  if (err.original && err.original.sqlMessage) {
    res.status(500).send({
      error: err.original.sqlMessage,
    });
  }

  return next(err);
});

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.sendStatus(500);
});

// Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
