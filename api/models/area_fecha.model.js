module.exports = (sequelize, Sequelize) => {
  return sequelize.define("area_muestreo_fecha", {
    id_muestro_mecha: {
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
    equipo: {
      type: Sequelize.INTEGER,
    },
    observaciones: {
      type: Sequelize.TEXT,
    },
  },
  {
    freezeTableName: true, 
    tableName: "area_muestreo_fecha",
    timestamps: false  
  });
};