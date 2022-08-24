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
  app.post("/api/transect/", controller.addTransect);
  app.put("/api/transect/", controller.addTransect);
  app.get("/api/transect/areas", controller.findAllAreas);
  app.get("/api/transect/areas/:id/teams", controller.findAllTransectAreaTeams);
  app.get("/api/transect/areas/:id", controller.findByArea);
};