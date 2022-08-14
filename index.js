const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// DB Init
const db = require("./api/models");
const Role = db.role;
db.sequelize.sync().then(() => {
  console.log('Connected to ECOSISTEMAS_ERIC database');
});

// simple route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Collecta API, you shouldn't be accessing here" });
});
// Routes initialization
require('./api/routes/auth.routes')(app);
require('./api/routes/user.routes')(app);
require('./api/routes/area.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;