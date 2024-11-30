  const { Sequelize } = require('sequelize');

  require('dotenv').config();

  const sequelize = new Sequelize(
    process.env.DB_NAME,    
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST, 
      dialect: 'mysql',
    }
  );

  // Test the connection
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('MySQL Connected');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

  module.exports = sequelize;
