/////////////////////////////////////////////////////////////
// Variables Iniciales 

const express = require('express');
const passport = require('passport');
const router = express.Router();
const strategy_name = 'google';
const { generateServicesToken } = require('../../controllers/handdlers/authServices');



/////////////////////////////////////////////////////////////
// Endpoints

//1) Endpoint que sirve para poder autenticarnos y perdile permisos a Google
router.get('/', passport.authenticate(strategy_name, { session: false, scope: ['profile', 'email'] }));


// 2) Endpoint de reedireción de google (Lo utiliza /auth/google)
router.get('/callback', passport.authenticate(strategy_name, { session: false, failureRedirect: '/failed' }), async(req, resp) => {


    //////////////////////////////////////////////
    //Variables 

    console.log("New request GET to /auth/google/callback");
    const google_data = req.user._json; //Accede a la info que google nos da
    const name = google_data.name
    const email = req.user._json.email;
    const username = `${strategy_name}${req.user._json.sub}${email}`
    let token = ''


    //////////////////////////////////////////////
    //Logica

    token = await generateServicesToken(username, email, name);


    //////////////////////////////////////////////
    //Response

    let url_frontend = `${process.env.URL_FRONT}`;
    url_frontend += `/orders.html?token=${token}`;
    resp.redirect(301, url_frontend)
        //resp.status(200).json({"token": `${token}`});

});






/////////////////////////////////////////////////////////////
// Exportamos 

module.exports = router;



//AUn no esta implementafdo
//Este es un middlerw que utiliza un usuario registrado para asociar su info a google
//DEBO PASARLE AQUI EL MIDDLEWARE  --> VERIFYTOKEN
/*
router.get('/connect', function (req, res, next) {

  /* Connects the current user account with Google. */
// TODO: This route must be private, implement a middleware to check the authorization.
//console.log("New request GET to auth//google/connect");
//const user_id = req.user.id;  // TODO: get the user id from the token
//const state = `${user_id}`;  // state must be string

// Te redirije a la autenticación con google
//passport.authenticate(strategy_name, { session:false, scope: ['profile', 'email'], state: state })(req, res, next);

//});