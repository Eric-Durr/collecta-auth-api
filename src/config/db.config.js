module.exports = {
  HOST: "10.6.129.74",
  USER: "eric_informatica",
  PASSWORD: "ecosistemas",
  DB: "ECOSISTEMAS_ERIC",
  dialect: "postgres",
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};