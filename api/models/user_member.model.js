module.exports = (sequelize, Sequelize) => {
  return sequelize.define("team_member", {
    id_team: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    id_member: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
  },
  {
    freezeTableName: true, 
    tableName: "team_member",
    timestamps: false  
  });
};