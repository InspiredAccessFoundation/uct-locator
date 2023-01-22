if (process.env.NODE_ENV != "local") {
  require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })
  console.log(`Using dotenv at location './.env.${process.env.NODE_ENV}'`)
} else {
  require('dotenv').config();
  console.log("Using default .env file config")
}

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
    database: process.env.POSTGRES_APP_DB,
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
    dialect: "postgres",
    pool: {
      max: 10,
      min: 1,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    ssl: true,
    pool: {
      max: 75,
      min: 25,
      acquire: 30000,
      idle: 10000
    }
  }
};