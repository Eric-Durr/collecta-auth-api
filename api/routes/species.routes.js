const controller = require("../controllers/species.controller");
module.exports = function(app) {
  app.use(function(_req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/species", controller.getAll);
  app.get("/api/species/transect", controller.getTransecSpecies);
  app.get("/api/species/transect/names", controller.getTransecSpeciesNames);
};