require('dotenv').config();

module.exports = {
  apps: [{
    name: "api",
    script: "src/main.js",
    watch: true,
    env_local: {
      "NODE_ENV": "local",
      "API_DESCRIPTION": "Estás ejecutando tu API en modo desarrollador.",
      "PORT":3000,
      "DB_HOST":"sprint3.cxbgbiilntg1.sa-east-1.rds.amazonaws.com",
      "DB_USERNAME":"rootnico",
      "DB_PASSWORD":12345678,
      "DB_NAME":"sprint3",
      "DB_PORT":3306,
      "REDIS_HOST":"redis-sprint3.cwkyre.0001.sae1.cache.amazonaws.com",
      "REDIS_PORT":6379,
      "JWT_PASS":1234567890
    },
    env_production: {
      "NODE_ENV": "production",
      "API_DESCRIPTION": "Estás ejecutando tu API en producción. ¡¡Ten cuidado!!",
      "PORT": process.env.PORT,
      "DB_HOST": process.env.DB_HOST,
      "DB_USERNAME": process.env.DB_USERNAME,
      "DB_PASSWORD": process.env.DB_PASSWORD,
      "DB_NAME": process.env.DB_NAME,
      "DB_PORT": process.env.DB_PORT,
      "REDIS_HOST": process.env.REDIS_HOST,
      "REDIS_PORT": process.env.REDIS_PORT,
      "JWT_PASS": process.env.JWT_PASS
    }
  }]
};
