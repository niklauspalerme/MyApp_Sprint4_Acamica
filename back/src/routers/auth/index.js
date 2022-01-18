const { Router } = require("express");
const google = require('./google');
const github = require('./github');
const auth0 = require('./auth0');
const linkedin = require('./linkedin');
const facebook = require('./facebook');


/////////////////////////////////////////////////////////////
// Función Principal


const authRouter = () => {

    const router = new Router();

    router.use('/google', google);
    router.use('/github', github);
    router.use('/auth0', auth0);
    router.use('/linkedin', linkedin)
    router.use('/facebook', facebook)

    return router;

}



/////////////////////////////////////////////////////////////
// Exportamos 

module.exports = {
    authRouter
}