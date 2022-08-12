const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// DB Init
const db = require("./src/models");
const Role = db.role;
db.sequelize.sync().then(() => {
  console.log('Connected to ECOSISTEMAS_ERIC database');
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

// simple route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Collecta API, you shouldn't be accessing here" });
});
// Routes initialization
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;