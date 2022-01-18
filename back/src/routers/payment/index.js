/////////////////////////////////////////////////////////////
// Variables Iniciales 

const {Router} = require("express");
const paypal = require ('./paypal.js')
const mercadopago = require ('./mercadopago');


/////////////////////////////////////////////////////////////
// Función Principal


const paymentRouter = () =>{

    const router = new Router();

   
    //Este endpoint es de prueba nada mas
    router.get('/paytest', function(req, res) {

        res.json({"Message": "Its working fine"});

    });


    router.use('/paypal', paypal);
    router.use('/mercadopago', mercadopago);



    return router;

}



/////////////////////////////////////////////////////////////
// Exportamos 

module.exports={
    paymentRouter
}