module.exports = (sequelize, Sequelize) => {
  return sequelize.define("inventario_equipo", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.TEXT,
    },
    dni: {
      type: Sequelize.STRING(9),
    },
    institucion: {
      type: Sequelize.TEXT,
    },
    rol: {
      type: Sequelize.TEXT,
    },
    observaciones: {
      type: Sequelize.TEXT,
    },
    "correo electronico": {
      type: Sequelize.TEXT,
    },
  },
  {
    freezeTableName: true, 
    tableName: "inventario_equipo",
    timestamps: false  
  });
};