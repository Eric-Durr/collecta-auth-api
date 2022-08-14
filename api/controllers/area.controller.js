const db = require("../models");
const Area = db.area_muestreo;
const Op = db.Sequelize.Op;

const OFFSET = 4000000; // offset in meters for the area 4.000 Km in each direction
const R = 6378137; // Earth Radius

exports.allInZone = (req, res) => {
  
  let latitudePlusOffset = req.body.lat + (OFFSET/R) * 180 / Math.PI;
  let latitudeMinusOffset = req.body.lat - (OFFSET/R) * 180 / Math.PI;
  let longitudePlusOffset = req.body.lon + (OFFSET / (R * Math.cos(Math.PI * req.body.lat / 180)) * 180 / Math.PI) ;
  let longitudeMinusOffset = req.body.lon - (OFFSET / (R * Math.cos(Math.PI * req.body.lat / 180)) * 180 / Math.PI);

  console.log(req.query.zone)

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