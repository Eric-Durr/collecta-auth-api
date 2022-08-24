const {sequelize}=require("../models");
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
// Select project by team ID
exports.selectById = (req, res) => {
  sequelize.query(
  `SELECT id_proyecto FROM equipo_proyecto `+
  `JOIN inventario_equipo `+
  `ON equipo_proyecto.id = inventario_equipo.id `+
  `JOIN team_member `+
  `ON team_member.id_member = inventario_equipo.id `+
  `WHERE team_member.id_team = ${req.params.id}`)
    .then(project => {
      if (!project) {
        console.log(`no project for team id ${req.query.id}`);
        return res.status(400).send({ message: "No teams found for the given ID" });
      }

      res.status(200).send(project[0][0]);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Select project by team ID
exports.selectMembersById = (req, res) => {
  sequelize.query(
  `SELECT nombre, institucion, inventario_equipo.rol  FROM equipo_proyecto `+
  `JOIN inventario_equipo `+
  `ON equipo_proyecto.id = inventario_equipo.id `+
  `JOIN team_member `+
  `ON team_member.id_member = inventario_equipo.id `+
  `WHERE team_member.id_team = ${req.params.id}`)
    .then(project => {
      if (!project) {
        console.log(`no project for team id ${req.query.id}`);
        return res.status(400).send({ message: "No teams found for the given ID" });
      }

      res.status(200).send({team_info: project[0]});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};