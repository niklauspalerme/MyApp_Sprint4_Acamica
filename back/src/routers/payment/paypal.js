/////////////////////////////////////////////////////////////
// Variables Iniciales 

const {Router} = require("express");
const paypal = require('@paypal/checkout-server-sdk'); // SDK de PayPal
const router = new Router();
const {updateStateOrderDB, updateOrderPaymentDB} = require('../../controllers/dbOperations/order')
require('dotenv').config();

// Agrega credenciales:
// Se usa SandboxEnvironment. 
//Para producción, usar LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);
let client = new paypal.core.PayPalHttpClient(environment);


/////////////////////////////////////////////////////////////
// Endpoints


//1) Crea la orden de pago y Devuelve el link de pago
router.post('/payment', async (req, res) => {


    console.log("New request POST to /paypal");
    let request = new paypal.orders.OrdersCreateRequest();

    //Creamos el Body Request de la orden
    request.requestBody({
          "intent": "CAPTURE",
          "purchase_units": [
              {
                  "amount": {
                      "currency_code": "MXN",
                      "value": `${req.body.amount}`
                  }
              }
            ],
          "application_context": {
            "return_url": `${process.env.URL_API}/paypal/redirect/${req.body.orderId}`, 
            "cancel_url": `${process.env.URL_API}/paypal/cancel/${req.body.orderId}`
          }
    });


    //Consumimos el body requets creado
    client.execute(request).then( response => {
      let {links} = response.result;
      console.log(links);
      let url = links.filter(link => link.rel == "approve");
      res.status(response.statusCode).json(url.pop());
    }).catch(err =>{
      console.error(err);
      res.status(err.statusCode).json(err);
    });


  });


//2) Cuando el pago se completa, se obtiene el token para capturar el pago del comprador
router.get('/redirect/:orderId', async (req, res) => {

  try {

    console.log("New request GET to /paypal/redirect/:orderId");
    let {token} = req.query; // Lo obtenemos del proceso de sandbox

    request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({});
    
    client.execute(request).then( async response=>{
      
      //Capturamos el uriParams de la orden
      let orderId = req.params.orderId

      //Resultado de la transacción
      //console.log(response.result);

      //Actualizamos el state de la orden y manera de pago
      await updateStateOrderDB(orderId, "Payment completed. Preparing Order");
      await updateOrderPaymentDB(orderId, 1)

      //Resultado del JSON de la orden creada con exito
      //console.log(response.json)
      res.status(200).json({"Message": `Thanks for your purchase. The orderId ${orderId} was successfully paid. You can check the status on our web :) `});

      
    }).catch(err => {
      console.error(err);
      res.status(err.statusCode).json(err);
    });
    
  } catch (err) {
    res.status(err.statusCode).json(err);
  }
    



  });

  
//2.4. Cuando se cancela, se redirige acá
router.get('/cancel/:orderId',async (req,res) => {
   try {

    console.log("New request GET to /paypal/cancel/:orderId");

    let orderId = req.params.orderId;

    await updateStateOrderDB(orderId,"Payment unsuccessful")
    res.status(200).json({"Message": `The payment for orderId ${orderId} was unsuccessful. Please try again with another way`});

   } catch (err) {
    res.status(err.statusCode).json(err);
   }
  });



/////////////////////////////////////////////////////////////
// Exportamos 

module.exports = router
