const controller = require("../controllers/transecto.controller");
module.exports = function(app) {
  app.use(function(_req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/transect/", controller.getAll);
  app.get("/api/transect/:date", controller.findByDateId);
};