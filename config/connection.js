const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  const connection = process.env.DATABASE_URL;
  // Code lifted from https://stackoverflow.com/questions/60048669/heroku-postgres-psql-fatal-no-pg-hba-conf-entry-for-host
  const sequelize = new Sequelize(connection,{
    logging: false,   //Loging disabled
    dialectOptions: {
      ssl:{
        require:true,
        rejectUnauthorized: false
      } 
    }
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;