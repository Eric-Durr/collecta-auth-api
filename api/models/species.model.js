// id_species        | integer |           | not null | nextval('autonumerico'::regclass)
// nombre_cientifico | text    |           | not null |
// observaciones     | text    |           |          |
// nombre_comun      | text    |           |          |
// division_clase    | integer |           | not null |
// biotipo           | integer |           |          |
// ciclo             | integer |           |          |
// raunkiaer         | integer |           |          |
// ruta metabólica   | integer |           |          |
// origen            | integer |           |          |
// distribucion      | integer |           |          |
// ruderal           | integer |           |          |
// familia           | integer |           |          |

module.exports = (sequelize, Sequelize) => {
  return sequelize.define("inventario_especies", {
    id_species: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nombre_cientifico: {
      type: Sequelize.TEXT,
    },
    observaciones: {
      type: Sequelize.TEXT,
    },
    nombre_comun: {
      type: Sequelize.TEXT,
    },
    division_clase: {
      type: Sequelize.INTEGER,
    },
    biotipo: {
      type: Sequelize.INTEGER,
    },
    ciclo: {
      type: Sequelize.INTEGER,
    },
    raunkiaer: {
      type: Sequelize.INTEGER,
    },
    "ruta metabólica": {
      type: Sequelize.INTEGER,
    },
    origen: {
      type: Sequelize.INTEGER,
    },
    distribucion: {
      type: Sequelize.INTEGER,
    },
    ruderal: {
      type: Sequelize.INTEGER,
    },
    familia: {
      type: Sequelize.INTEGER,
    },
  },
    {
      freezeTableName: true, 
      tableName: "inventario_especies",
      timestamps: false  
    }
  );
}