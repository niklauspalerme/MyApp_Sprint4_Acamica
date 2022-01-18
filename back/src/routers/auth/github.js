/////////////////////////////////////////////////////////////
// Variables Iniciales 

const express = require('express');
const passport = require('passport');
const router = express.Router();
const strategy_name = 'github';
const strategy_scope = ['user:email', 'read:user'];
const {generateServicesToken} = require ('../../controllers/handdlers/authServices');



/////////////////////////////////////////////////////////////
// Endpoints


//1) Endpoint que sirve para poder autenticarnos y perdile permisos a Github
router.get('/', passport.authenticate(strategy_name, { session:false, scope: strategy_scope}));



//2) Este endpoint no es una ruta de la API, Se utiliza del reedirecionamiento del browser
router.get('/callback', passport.authenticate(strategy_name, {  session:false, failureRedirect: '/failed' }),  async (req, resp) => {


    //////////////////////////////////////////////
    //Variables

    console.log("New request GET to /auth/github/callback");
    const github_data = req.user._json;
    const name = github_data.name
    const email = github_data.email;
    const username = `${strategy_name}${github_data.id}${email}`
    let token = ''


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



//TO DO - NO SE SABE QUE HACER CON ESE AUN 
router.get('/connect', function (req, res, next) {
  
  
  console.log("New request GET to /mercadopago/payment/:orderId");
  
  /* Connects the current user account with Google. */

  // TODO: This route must be private, implement a middleware to check the authorization.

  console.log("New request GET to /github/connect");

  // We supose that the middleware defines the req.user object
  req.user = {id: 1,}

  passport_connect(strategy_name, strategy_scope, req, res, next);
});

module.exports = router;