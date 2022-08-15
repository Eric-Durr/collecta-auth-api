const db = require("../models");
const Team = db.equipo_proyecto;
const Op = db.Sequelize.Op;


// Select all teams
exports.allTeams = (_req, res) => {
  Team.findAll()
    .then(teams => {
      if (!teams) {
        console.log('no teams');
        return res.status(400).send({ message: "No teams found" });
      }
      res.status(200).send({teams: teams});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Select team by ID
exports.selectById = (req, res) => {
  Team.findOne({
      where: { id: req.params.id }
    })
    .then(team => {
      if (!team) {
        console.log(`no team for id ${req.query.id}`);
        return res.status(400).send({ message: "No teams found for the given ID" });
      }
      res.status(200).send(team);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};