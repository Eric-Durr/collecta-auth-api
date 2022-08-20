const db = require("../models");
const Transecto = db.transecto;
const Op = db.Sequelize.Op;

exports.getAll = (_req, res) => {
  Transecto.findAll()
    .then(transect => {
      if (!transect) {
        return res.status(400).send({ message: "Transect measure database is empty" });
      }
      res.status(200).send({
        transect: transect
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findByDateId = (req, res) => {
  Transecto.findAll({
    where: {
      id_fecha_metodo: req.params.date
    }
  })
    .then(transect => {
      if (!transect) {
        return res.status(400).send({ message: `No transect with Date ID: ${req.params.date}`  });
      }
      res.status(200).send({
        transect: transect
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};