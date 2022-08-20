module.exports = (sequelize, Sequelize) => {
  return sequelize.define("area_muestreo_metodo", {
    id_area: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    metodo: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    fecha: {
      type: Sequelize.DATE,
      primaryKey: true
    },
    replica: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    tecnico: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    observaciones: {
      type: Sequelize.TEXT,
    },
    id_combinado: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
  },
  {
    freezeTableName: true, 
    tableName: "area_muestreo_metodo",
    timestamps: false  
  });
};