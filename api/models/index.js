const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Custom auth tables
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
// Existing tables
db.area_muestreo = require("./area.model.js")(sequelize, Sequelize);
db.area_muestreo_metodo = require("./area_metodo.model.js")(sequelize, Sequelize);
db.area_muestreo_fecha = require("./area_fecha.model.js")(sequelize, Sequelize);
db.inventario_especies = require("./species.model.js")(sequelize, Sequelize);
db.transecto = require("./transecto.model.js")(sequelize, Sequelize);
db.equipo_proyecto = require("./team.model.js")(sequelize, Sequelize);

// DB  config
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.inventario_especies.hasMany(db.transecto, {
  foreignKey: "especie",
  otherKey: "species"
});
db.transecto.belongsTo(db.inventario_especies, {
  foreignKey: "especie",
  otherKey: "species"
});


db.area_muestreo_metodo.hasMany(db.transecto);
db.transecto.belongsTo(db.area_muestreo_metodo);
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;