/////////////////////////////////////////////////////////////
// Variables Iniciales 

const {Router} = require("express");
const paypal = require ('./paypal.js')
const mercadopago = require ('./mercadopago');


/////////////////////////////////////////////////////////////
// Función Principal


const paymentRouter = () =>{

    const router = new Router();

    router.use('/paypal', paypal);
    router.use('/mercadopago', mercadopago);



    return router;

}



/////////////////////////////////////////////////////////////
// Exportamos 

module.exports={
    paymentRouter
}