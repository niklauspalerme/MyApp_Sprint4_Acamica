/////////////////////////////////////////////////////////////
// Variables Iniciales 

const express = require('express');
const passport = require('passport');
const router = express.Router();
const strategy_name = 'facebook';
const strategy_scope = ['email'];
const { generateServicesToken } = require('../../controllers/handdlers/authServices');


/////////////////////////////////////////////////////////////
// Endpoints

//1) Endpoint que sirve para poder autenticarnos y perdile permisos a Facebook
router.get('/', passport.authenticate(strategy_name, { session: false, scope: strategy_scope }));



// 2) Endpoint de reedireción de google (Lo utiliza /auth/facebook)
router.get('/callback', passport.authenticate(strategy_name, { session: false, failureRedirect: '/failed' }), async(req, resp) => {

    //////////////////////////////////////////////
    //Variables 

    console.log("New request GET to /auth/facebook/callback");
    const facebook_data = req.user._json;
    const name = `${facebook_data.first_name} ${facebook_data.last_name}`
    const email = facebook_data.email;
    const username = `${strategy_name}${facebook_data.id}${email}`

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