require('dotenv').config();

module.exports = {
  local: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres"
  },
  // Pulled from AWS Secrets Manager and stored in ENV vars
  migrate: {
    username: process.env.POSTGRES_ADMIN_USERNAME,
    password: process.env.POSTGRES_ADMIN_PASSWORD,
    database: process.env.POSTGRES_ADMIN_DB,
    host: process.env.POSTGRES_ADMIN_HOST,
    port: process.env.POSTGRES_ADMIN_PORT,
    dialect: "postgres",
    pool: {
      max: 1,
      min: 1,
      acquire: 30000,
      idle: 10000
    }
  },
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres"
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres"
  }
};