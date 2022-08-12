const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
      next();
      // Email
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let role in req.body.roles.length) {
      if (!ROLES.includes(role)) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + role
        });
        return;
      }
    }
  }
  
  next();
};
const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;