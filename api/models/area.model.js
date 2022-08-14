module.exports = (sequelize, Sequelize) => {
  return sequelize.define("area_muestreo", {
    id_area: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    X: {
      type: Sequelize.DECIMAL
    },
    Y: {
      type: Sequelize.DECIMAL
    },
    proyecto: {
      type: Sequelize.INTEGER,
    },
    observaciones: {
      type: Sequelize.TEXT,
    },
    zona_UTM: {
      type: Sequelize.STRING(5),
    },
    "sistema geográfico": {
      type: Sequelize.TEXT,
    },
  },
  {
    freezeTableName: true, 
    tableName: "area_muestreo",
    timestamps: false  
  });
};