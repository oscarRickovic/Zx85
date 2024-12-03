# Database Configuration - `db.js`

## Description

This file contains the configuration for connecting to a MySQL database using Sequelize ORM. It initializes the Sequelize instance, handles database authentication, and loads environment variables for secure database credentials management.

## Files

- `config/db.js`: Contains the Sequelize setup and connection logic to the MySQL database.

## Setup Instructions

### 1. Install Required Packages

Make sure you have the following dependencies installed:

- `sequelize`: ORM used to interact with the MySQL database.
- `mysql2`: MySQL client for Sequelize.
- `dotenv`: Loads environment variables from the `.env` file.

Install them using npm:

```bash
npm install sequelize mysql2 dotenv
