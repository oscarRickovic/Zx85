const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID, // Use UUID type for random unique identifiers
    defaultValue: DataTypes.UUIDV4, // Generate UUID by default
    primaryKey: true, 
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true, // Validate proper email format
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
