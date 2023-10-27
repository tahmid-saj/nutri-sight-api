const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const { api } = require("./routes/api.routes");

const app = express();

// middleware
// TODO: move to env
app.use(cors({
  origin: 'https://localhost:3000'
}));
app.use(morgan("combined"));
app.use(express.json());
app.use(bodyParser.text());
app.use("/v1", api);

module.exports = {
  app,
};
