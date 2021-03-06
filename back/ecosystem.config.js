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
      "DB_HOST":"sprint3.c49ylfjc2mbm.sa-east-1.rds.amazonaws.com",
      "DB_USERNAME":"rootnico",
      "DB_PASSWORD":12345678,
      "DB_NAME":"sprint3",
      "DB_PORT":3306,
      "REDIS_HOST":"redis-sprint3.cwkyre.0001.sae1.cache.amazonaws.com",
      "REDIS_PORT":6379,
      "JWT_PASS":1234567890,
      "URL_FRONT":"https://www.delilahrestonico.tk",
      "URL_API":"https://api.delilahrestonico.tk",

      "GOOGLE_CLIENT_ID":"484773279156-ujtb9u6aa3344o699t50tgqds37ofipq.apps.googleusercontent.com",
      "GOOGLE_CLIENT_SECRET":"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",
      "GOOGLE_CALLBACK":"https://api.delilahrestonico.tk/api/v1/auth/google/callback",

      "FACEBOOK_CLIENT_ID":"1427890754309264",
      "FACEBOOK_CLIENT_SECRET":"8973849aa6725a2c701119af436fd042",
      "FACEBOOK_CALLBACK":"https://api.delilahrestonico.tk/api/v1/auth/facebook/callback",

      "LINKEDIN_CLIENT_ID":"77u8rwqcczvf5f",
      "LINKEDIN_CLIENT_SECRET":"jiHInp1ir11AGNaZ",
      "LINKEDIN_CALLBACK":"https://api.delilahrestonico.tk/api/v1/auth/linkedin/callback",

      "GITHUB_CLIENT_ID":"defe7a7422fd437b787b",
      "GITHUB_CLIENT_SECRET":"1bc51ad325416c71c871612e47a8f3548950ca92",
      "GITHUB_CALLBACK":"https://api.delilahrestonico.tk/api/v1/auth/github/callback",

      "AUTH0_BASE_URL":"https://api.delilahrestonico.tk/api/v1/auth/auth0",
      "AUTH0_CLIENT_ID":"JwSZQQGOkgd3OScE9tOvGKj2XJSXOJHx",
      "AUTH0_ISSUER_BASE_URL":"https://dev-zgut56r8.us.auth0.com",


      "MERCADOPAGO_PUBLIC_KEY":"TEST-4f1be09b-de90-409e-be6c-282da7b8c326",
      "MERCADOPAGO_TOKEN":"TEST-1762418979261619-091023-b28f7098b8cc27602768e43b5b67f0f7-358220025",
      
      "PAYPAL_CLIENT_ID":"Ad59YdTo92RtahOTQwdIqWozeLwR3gDjuL3aRX3Z7SjfzZC6hmuu_LFRc4Ck_iQmRL1WUiogULWzbQxo",
      "PAYPAL_SECRET":"EGBSezZ5RfnYaNsU1tgE-KcC0KgRGvwL25WqRqP_DmrKfYW0gcjbE5Cq2hB2gQbe5-4lbbXagP5oGG8I"
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
      "JWT_PASS": process.env.JWT_PASS,
      "URL_FRONT":process.env.URL_FRONT,
      "URL_API":process.env.URL_API,
      "GOOGLE_CLIENT_ID": process.env.GOOGLE_CLIENT_ID,
      "GOOGLE_CLIENT_SECRET": process.env.GOOGLE_CLIENT_SECRET,
      "GOOGLE_CALLBACK": process.env.GOOGLE_CALLBACK,
      "FACEBOOK_CLIENT_ID": process.env.FACEBOOK_CLIENT_ID,
      "FACEBOOK_CLIENT_SECRET": process.env.FACEBOOK_CLIENT_SECRET,
      "FACEBOOK_CALLBACK": process.env.FACEBOOK_CALLBACK,
      "LINKEDIN_CLIENT_ID": process.env.LINKEDIN_CLIENT_ID,
      "LINKEDIN_CLIENT_SECRET": process.env.LINKEDIN_CLIENT_SECRET,
      "LINKEDIN_CALLBACK": process.env.LINKEDIN_CALLBACK,
      "GITHUB_CLIENT_ID": process.env.GITHUB_CLIENT_ID,
      "GITHUB_CLIENT_SECRET": process.env.GITHUB_CLIENT_SECRET,
      "GITHUB_CALLBACK": process.env.GITHUB_CALLBACK,
      "AUTH0_BASE_URL": process.env.AUTH0_BASE_URL,
      "AUTH0_CLIENT_ID": process.env.AUTH0_CLIENT_ID,
      "AUTH0_ISSUER_BASE_URL": process.env.AUTH0_ISSUER_BASE_URL,
      "MERCADOPAGO_PUBLIC_KEY": process.env.MERCADOPAGO_PUBLIC_KEY,
      "MERCADOPAGO_TOKEN": process.env.MERCADOPAGO_TOKEN,
      "PAYPAL_CLIENT_ID": process.env.PAYPAL_CLIENT_ID,
      "PAYPAL_SECRET": process.env.PAYPAL_SECRET,
    }
  }]
};
