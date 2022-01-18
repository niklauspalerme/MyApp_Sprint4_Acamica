/////////////////////////////////////////////////////////////
// Variables Iniciales 


const express = require('express');
const passport = require('passport');
const router = express.Router();
const strategy_name = 'auth0';
const strategy_scope = ['openid email profile'];
const {generateServicesToken} = require ('../../controllers/handdlers/authServices');





/////////////////////////////////////////////////////////////
// Endpoints

//1) Endpoint que sirve para poder autenticarnos y perdile permisos a auth0
router.get('/', passport.authenticate(strategy_name, { session:false, scope: strategy_scope}));


// 2) Endpoint de reedireción de google (Lo utiliza /auth/auth0)
router.get('/callback', passport.authenticate(strategy_name, {  session:false, failureRedirect: '/failed' }), async(req, resp)=>{

    console.log("New request GET to /auth/auth0/callback");
    const auth0_data = req.user._json;
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



router.get('/auth0/connect', function (req, res, next) {
  /* Connects the current user account with Auth0. */

  // TODO: This route must be private, implement a middleware to check the authorization.

  console.log("New request GET to /auth0/connect");

  // We supose that the middleware defines the req.user object
  req.user = {id: 1,}

  //passport_connect(strategy_name, strategy_scope, req, res, next);

});

module.exports = router;