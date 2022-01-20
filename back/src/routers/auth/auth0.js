/////////////////////////////////////////////////////////////
// Variables Iniciales 

const express = require('express');
const router = express.Router();
const {generateServicesToken} = require ('../../controllers/handdlers/authServices');
const strategy_name = 'auth0';
const { auth } = require('express-openid-connect');
require('dotenv').config()

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL:  process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL:  process.env.AUTH0_ISSUER_BASE_URL,
  secret: 'LONG_RANDOM_STRING'
};

router.use(auth(config));



/////////////////////////////////////////////////////////////
// Endpoints


//1) Endpoint que sirve para poder autenticarnos y perdile permisos a auth0
router.get('/', async (req,resp)=>{

    console.log("New request GET to /auth/auth0");
    const auth0_data = req.oidc.user;
    const name = auth0_data.name;
    const email = auth0_data.email;
    const username = `${strategy_name}${auth0_data.sub}${email}`
    let token= ''
   

   //////////////////////////////////////////////
    //Logica

    token = await generateServicesToken(username,email,name);


    //////////////////////////////////////////////
    //Response

    let url_frontend = `${process.env.URL_FRONT}`;
    url_frontend += `/orders.html?token=${token}`;
    resp.redirect(301,url_frontend)
    //resp.status(200).json({"token": `${token}`});

  }
);


/////////////////////////////////////////////////////////////
// Exportamos

module.exports = router;