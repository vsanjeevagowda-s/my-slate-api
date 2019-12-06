const config = {
  db_url: process.env.DB_URL,
  db_name: process.env.DB_NAME,
  port: process.env.PORT,
  jwt_secret_key: process.env.JWT_SECRET_KEY
}

module.exports = config;