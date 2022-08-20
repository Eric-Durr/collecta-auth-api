module.exports = (sequelize, Sequelize) => {
  return sequelize.define("muestreo_datos_vegetacion_mapatrans", {
    punto: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    especie: {
      type: Sequelize.INTEGER,
    },
    contactos: {
      type: Sequelize.INTEGER,
    },
    id_fecha_metodo: {
      type: Sequelize.INTEGER,
    }
  },
  {
    freezeTableName: true, 
    tableName: "muestreo_datos_vegetacion_mapatrans",
    timestamps: false  
  });
};