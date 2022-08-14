const { verifySignUp } = require("../middleware");
const controller = require("../controllers/area.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/areas/in-zone", controller.allInZone);
};