module.exports = (sequelize, Sequelize) => {
  return sequelize.define("equipo_proyecto", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    id_proyecto: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    rol: {
      type: Sequelize.TEXT,
    },
    observaciones: {
      type: Sequelize.TEXT,
    }
  },
  {
    freezeTableName: true, 
    tableName: "equipo_proyecto",
    timestamps: false  
  });
};