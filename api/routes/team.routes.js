const controller = require("../controllers/team.controller");
module.exports = function(app) {
  app.use(function(_req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/teams/", controller.allTeams);
  app.get("/api/teams/:id", controller.selectById);
};