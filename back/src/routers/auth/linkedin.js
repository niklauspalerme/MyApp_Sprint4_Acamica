/////////////////////////////////////////////////////////////
// Variables Iniciales 

const express = require('express');
const passport = require('passport');
const router = express.Router();
const strategy_name = 'linkedin';
const strategy_scope = ['r_liteprofile', 'r_emailaddress']
const { generateServicesToken } = require('../../controllers/handdlers/authServices');


/////////////////////////////////////////////////////////////
// Endpoints


//1) Endpoint que sirve para poder autenticarnos y perdile permisos a Linkedin
router.get('/', passport.authenticate(strategy_name, { session: false, scope: strategy_scope }));


// 2) Endpoint de reedireción de linkedin (Lo utiliza /auth/linkedin)
router.get('/callback', passport.authenticate(strategy_name, { session: false, scope: strategy_scope, failureRedirect: '/failed' }), async(req, resp) => {


    //////////////////////////////////////////////
    //Variables 

    console.log("New request GET to /auth/linkedin/callback");

    const linkedin_data = req.user._json;
    const name = linkedin_data.firstName.localized.en_US || linkedin_data.firstName.localized.es_ES || 'Please modify your name';
    const email = `${strategy_name}${linkedin_data.id}@linkedin.com`;
    const username = `${strategy_name}${linkedin_data.id}@linkedin.com`;
    let token = "";


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



module.exports = router;