const db = require("../models");
const sequelize = db.sequelize;
const Species = db.inventario_especies;
const Transect = db.transecto;
const Op = db.Sequelize.Op;

exports.getTransecSpecies = (_req, res) => {
  sequelize.query(
    `SELECT id_species, nombre_cientifico, nombre_comun, origen FROM inventario_especies JOIN muestreo_datos_vegetacion_mapatrans ON inventario_especies.id_species = muestreo_datos_vegetacion_mapatrans.especie`
  ).then(transectSpecies => {
    if (!transectSpecies) {
      return res.status(400).send({ message: `No species in database used for transect measures` });
    }
    let species = transectSpecies[0].sort((a, b) => (a.id_species > b.id_species) ? 1 : -1).filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id_species === value.id_species && t.nombre_cientifico === value.nombre_cientifico
      ))
    );
    return res.status(200).send({transectSpecies: species});
  }).catch(err => {
     res.status(500).send({ message: err.message });
   });
};
exports.getTransecSpeciesNames = (_req, res) => {
  sequelize.query(
    `SELECT id_species, nombre_cientifico, nombre_comun, origen FROM inventario_especies JOIN muestreo_datos_vegetacion_mapatrans ON inventario_especies.id_species = muestreo_datos_vegetacion_mapatrans.especie`
  ).then(transectSpecies => {
    if (!transectSpecies) {
      return res.status(400).send({ message: `No species in database used for transect measures` });
    }
    let species = transectSpecies[0].sort((a, b) => (a.id_species > b.id_species) ? 1 : -1).filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id_species === value.id_species && t.nombre_cientifico === value.nombre_cientifico
      ))
    ).map(speciesObj => `${speciesObj.nombre_cientifico}${speciesObj.nombre_comun ? ` (${speciesObj.nombre_comun})` : ''}`);
    return res.status(200).send({transectSpecies: species});
  }).catch(err => {
     res.status(500).send({ message: err.message });
   });
};

exports.getAll = (_req, res) => {
  Species.findAll().then(species => {
    if (!species) {
      return res.status(400).send({ message: `No species in database` });
    }
    return res.status(200).send({species: species});
  }).catch(err => {
     res.status(500).send({ message: err.message });
   });
};