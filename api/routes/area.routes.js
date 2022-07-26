const controller = require("../controllers/area.controller");
module.exports = function(app) {
  app.use(function(_req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/areas/in-zone", controller.allInZone);
  app.get("/api/areas/:id", controller.findById);
  app.post("/api/areas/", controller.addArea);
  app.delete("/api/areas/:id", controller.deleteById);
  app.get("/api/areas/:id/transect-measures", controller.allAreaTransectMeasures);
};