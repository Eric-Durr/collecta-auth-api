const db = require("../models");
const User = db.user;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.deleteById = (req, res) => {
  User.findOne({
     where: { id: Number.parseInt(req.params.id) }
   })
   .then(user =>  {
     if (!user) {
       return res.status(400).send({ message: `User withh ID ${req.params.id} doens't exists` });
     }
     user.destroy();
     return res.status(200).send({message: "User deleted successfully"});
   }).catch(err => {
     res.status(500).send({ message: err.message });
   });
 };
