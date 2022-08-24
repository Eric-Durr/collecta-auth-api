const db = require("../models");
const Transecto = db.transecto;
const Metodo = db.area_muestreo_metodo;
const Species = db.species;
const sequelize = db.sequelize;

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

exports.findAllAreas = (_req, res) => {
  sequelize.query(
    `SELECT id_area FROM muestreo_datos_vegetacion_mapatrans `+
    `JOIN area_muestreo_metodo ` +
    `ON muestreo_datos_vegetacion_mapatrans.id_fecha_metodo = area_muestreo_metodo.id_combinado ` +
    `WHERE area_muestreo_metodo.metodo=835`
  ).then(transectMeasures => {
    if (!transectMeasures) {
      return res.status(400).send({ message: `No transect measures found for this area` });
    }
    let areas = transectMeasures[0].sort((a, b) => (a.id_area > b.id_area) ? 1 : -1).filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id_area === value.id_area
      ))
    )
    return res.status(200).send({areas: areas});
  }).catch(err => {
     res.status(500).send({ message: err.message });
   });
};

// Mandatory data for app
// static const String id = '_id';
// static const String species = 'species';
// static const String soil = 'soil';
// static const String mulch = 'mulch';
// static const String rock = 'rock';
// static const String stone = 'stone';
// static const String annotations = 'annotations';
// static const String created = 'created_date';
// static const String mark = 'mark_time';
// static const String hits = 'hits';
// static const String areaId = 'area_id';
// static const String teamId = 'team_id';

exports.findByArea = (req, res) => {
  sequelize.query(
    `SELECT punto, nombre_cientifico, nombre_comun, contactos, fecha `+
    `FROM muestreo_datos_vegetacion_mapatrans `+
    `JOIN area_muestreo_metodo ` +
    `ON muestreo_datos_vegetacion_mapatrans.id_fecha_metodo = area_muestreo_metodo.id_combinado ` +
    `JOIN inventario_especies ` +
    `ON muestreo_datos_vegetacion_mapatrans.especie = inventario_especies.id_species ` +
    `WHERE area_muestreo_metodo.metodo=835 AND area_muestreo_metodo.id_area=${req.params.id}`
  ).then(transectMeasures => {
    if (!transectMeasures) {
      return res.status(400).send({ message: `No transect measures found for this area` });
    }
    
    return res.status(200).send({transectSpecies: transectMeasures[0]});
  }).catch(err => {
     res.status(500).send({ message: err.message });
   });
};

exports.findAllTransectAreaTeams = (req, res) => {
  sequelize.query(
    `SELECT equipo `+
    `FROM area_muestreo `+
    `JOIN area_muestreo_metodo ` +
    `ON area_muestreo.id_area = area_muestreo_metodo.id_area ` +
    `JOIN area_muestreo_fecha ` +
    `ON area_muestreo_fecha.id_muestreo_fecha = area_muestreo_metodo.id_area ` +
    `WHERE area_muestreo_metodo.metodo=835 AND area_muestreo_fecha.equipo IS NOT NULL`
  ).then(transectMeasures => {
    if (!transectMeasures) {
      return res.status(400).send({ message: `No transect measures found for this area` });
    }
    const teams = transectMeasures[0].filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.equipo === value.equipo && t.equipo != null
    )))
    return res.status(200).send({teams: teams});
  }).catch(err => {
     res.status(500).send({ message: err.message });
   });
};

exports.findByAreaAndTeam = (req, res) => {
  sequelize.query(
    `SELECT punto, nombre_cientifico, nombre_comun, contactos, fecha `+
    `FROM muestreo_datos_vegetacion_mapatrans `+
    `JOIN area_muestreo_metodo ` +
    `ON muestreo_datos_vegetacion_mapatrans.id_fecha_metodo = area_muestreo_metodo.id_combinado ` +
    `JOIN inventario_especies ` +
    `ON muestreo_datos_vegetacion_mapatrans.especie = inventario_especies.id_species ` +
    `JOIN area_muestreo_fecha ` +
    `ON area_muestreo_fecha.fecha = area_muestreo_metodo.fecha ` +
    `WHERE area_muestreo_metodo.metodo=835 AND area_muestreo_metodo.id_area=${req.params.id} AND area_muestreo_fecha.equipo=${req.params.team}`
  ).then(transectMeasures => {
    if (!transectMeasures) {
      return res.status(400).send({ message: `No transect measures found for this area` });
    }
    
    return res.status(200).send({transectSpecies: transectMeasures[0]});
  }).catch(err => {
     res.status(500).send({ message: err.message });
   });
};

exports.addTransect= (req, res) => {
  sequelize.query(
    `SELECT punto, id_fecha_metodo, especie`+
    `FROM muestreo_datos_vegetacion_mapatrans `+
    `JOIN area_muestreo_metodo ` +
    `ON muestreo_datos_vegetacion_mapatrans.id_fecha_metodo = area_muestreo_metodo.id_combinado ` +
    `JOIN inventario_especies ` +
    `ON muestreo_datos_vegetacion_mapatrans.especie = inventario_especies.id_species ` +
    `WHERE area_muestreo_metodo.metodo=835 `+
    `AND area_muestreo_metodo.id_area = ${req.body.area}`+
    `AND muestreo_datos_vegetacion_mapatrans.punto=${req.body.id} `+
    `AND muestreo_datos_vegetacion_mapatrans.especie=${req.body.species} `+
    `AND muestreo_datos_vegetacion_mapatrans.contactos=${req.body.hits} `+
    `AND muestreo_datos_vegetacion_mapatrans.id_fecha_metodo=${req.body.area} ` +
    `AND area_muestreo_metodo.created=${req.body.date} ` 
   )
   .then(measure => {
     if (measure) {
       return res.status(400).send({ message: `Measure already exists` });
     } else {
      let speciesId;
       Species.findOne(
          {
            where: {
              nombre_cientifico:{
                [Op.like]: `${req.body.scientific}`
              }
            }
          }
        )
        .then(async (item ) =>  {
          speciesId = item.id_species
          const instancePerArea = await Metodo.findAll({
            where: {
              id_area:  Number.parseInt(req.body.area),
              metodo: 835,
              fecha: req.body.created
            }
          })


          Metodo.create({
            id_area: Number.parseInt(req.body.area),
            metodo: 835,
            fecha: req.body.created,
            replica: instancePerArea.length === 0 ? 1 : instancePerArea.length + 1,
            tecnico: 12,
            observaciones: '',
          })




          Transecto.create({
            punto: Number.parseInt(req.body.id),
            especie: Number.parseInt(speciesId),
            contactos: Number.parseInt(re.body.hits),
            id_fecha_metodo: Number.parseInt(re.body.hits),
          })
          .then(newArea => {
            res.status(201).send({message: `Area added succesfully`, area: newArea});
          }
          )
          .catch(err => {
            res.status(500).send({ message: err.message });
          })
        })
        .catch(() =>
          res.status(400).send({ message:  'Detected wrong species name'}))
     }
   }).catch(err => {
     res.status(500).send({ message: err.message });
   });
 };