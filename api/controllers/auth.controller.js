const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Member = db.user_member;
const Project = db.equipo_proyecto;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  // Save User to Database

  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(user => {
      let success = true
      req.body.members.forEach(member => {
          Member.create({
            id_team: user.id,
            id_member: member
          }).catch((_err) => {
              success = false;
          })
      });

      

      if (success) {
        return res.status(200).send({
          message: 'Team built correctly',
          data: {
            username: user.username,
            team_id: user.id,
          },
      });
      } else {
        return res.status(500).send({message: 'Failed building team'});
      }
    
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        console.log('no user');
        return res.status(400).send({ message: "Wrong user or password." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(400).send({
          accessToken: null,
          message: "Wrong user or password."
        });
      }
      let success = true
      let projectId;
      Project.findOne({
        where: {
          id: req.body.members[0]
        }
      }).then((project) => {
        projectId = project.id_proyecto
      }).catch( () => {
        success = false;
      })
      if (success) {

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        res.status(200).send({
          id: user.id,
          username: user.username,
          project_id: projectId,
          accessToken: token
        });
      } else {
        return res.status(400).send({
          accessToken: null,
          message: "Project not found."
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.logout = (_req, res) => {
  res.status(200).send({auth: false, token: null});
};