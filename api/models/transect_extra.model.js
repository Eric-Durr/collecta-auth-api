module.exports = (sequelize, Sequelize) => {
  return sequelize.define("mapatrans_extra_data", {
    punto: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    fecha: {
      type: Sequelize.DATE,
      primaryKey: true
    },
    id_area: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    mark: {
      type: Sequelize.TEXT,
    },
    annotations: {
      type: Sequelize.TEXT,
    }
  },
  {
    freezeTableName: true, 
    tableName: "mapatrans_extra_data",
    timestamps: false  
  });
};