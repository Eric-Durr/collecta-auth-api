const db = require("../models");
const Area = db.area_muestreo;
const Op = db.Sequelize.Op;

const OFFSET = 4000000; // offset in meters for the area 4.000 Km in each direction
const R = 6378137; // Earth Radius

exports.allInZone = (req, res) => {
  
  Area.findAll(
    {
      where: {
          zona_UTM: {
            [Op.like]: '%' + req.query.zone + '%'
          }
      }
    }
  )
    .then(areas => {
      if (!areas) {
        console.log('no areas');
        return res.status(400).send({ message: "No areas found in zone" });
      }
      console.log(areas);
      res.status(200).send({
        areas: areas
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findById = (req, res) => {
  
  Area.findOne({
    where: { id_area: req.params.id }
  })
  .then(area => {
    if (!area) {
      console.log(`no area for id ${req.query.id}`);
      return res.status(400).send({ message: "No areas found for the given ID" });
    }
    res.status(200).send(area);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.addArea = (req, res) => {
 Area.findOne({
    where: { id_area: Number.parseInt(req.body.id_area) }
  })
  .then(area => {
    if (area) {
      return res.status(400).send({ message: `Area with ID ${area.id_area} already exists` });
    } else {
      Area.create({
        id_area: req.body.id_area,
        X: req.body.longitude,
        Y: req.body.latitude,
        proyecto: req.body.project_id,
        observaciones: req.body.annotations,
        zona_UTM: req.body.uTMZone,
        "sistema geográfico": req.body.geographicSystem,
      }).then(newArea => {
        res.status(201).send({message: `Area ${newArea.id_area} added succesfully`, area: newArea});
      }
      ).catch(err => {
        res.status(500).send({ message: err.message });
      })
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.deletaById = (req, res) => {
  Area.findOne({
     where: { id_area: Number.parseInt(req.params.id) }
   })
   .then(area =>  {
     if (!area) {
       return res.status(400).send({ message: `Area with ID ${area.id_area} doens't exists` });
     }
     area.destroy();
     return res.status(200).send({message: "Area deleted successfully"});
   }).catch(err => {
     res.status(500).send({ message: err.message });
   });
 };