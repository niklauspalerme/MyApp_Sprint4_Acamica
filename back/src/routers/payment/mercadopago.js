/////////////////////////////////////////////////////////////
// Variables Iniciales 

const express = require('express');
const router = express.Router();
require('dotenv').config();
const mercadopago = require ('mercadopago');
const {verifyJWT, verifyUserDisabled} = require('../../middleware/auth')
const {getOneUserDB} = require ('../../controllers/dbOperations/user')
const {getOrderDB, updateOrderPaymentDB, updateStateOrderDB} = require ('../../controllers/dbOperations/order')


//Configuramos las credenciales de desarrollador
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_TOKEN
});


/////////////////////////////////////////////////////////////
// Endpoints


// 1) Endpoint para poder crear la orden en MP
router.post('/payment/:orderId', verifyJWT,verifyUserDisabled,  async (req, res) => {

  //1) Buscamos el usuario y la orden
  console.log("New request POST to /mercadopago/payment/:orderId");
  let orderId = req.params.orderId;
  let token = req.headers.authentication;
  let user =  await getOneUserDB(token);
  let itemsDB = await getOrderDB(orderId);
  let items = []

 
  user = {
    "id": user.dataValues.id,
    "name": user.dataValues.name,
    "email": user.dataValues.email,

  }

  for (let i = 0 ; i < itemsDB[0].Products.length; i++){
    
    let items1 = {
      title: itemsDB[0].Products[i].dataValues.name,
      unit_price: itemsDB[0].Products[i].dataValues.price,
      quantity: itemsDB[0].Products[i].dataValues.OrderProduct.quantity,
    }

    items.push(items1)
  }

  // 2) Creamo un objeto preference para pasarselo a MP

  let preference = {
    "auto_return": "approved",
    "back_urls": {
        "success": `${process.env.URL_API}/mercadopago/success/${orderId}`,  
        "failure": `${process.env.URL_API}/mercadopago/failure/${orderId}`,  
        "pending": `${process.env.URL_API}/mercadopago/pending/${orderId}` 
    },
    "payer": {
      "id": user.id,
      "nickname": user.name,
      "email": user.email
    },
    items: items
  };

  // 2) petición a mercado pago para preparar la compra
  mercadopago.preferences.create(preference)
  .then((response)=>{
  
    //2.1) Retorna el objeto para poder crear la compra
    let id = response.body.id;

    //2.2) Mandi el JSON con la infor importante
    res.json({"preference_id": id, 'url': response.body.sandbox_init_point});

  }).catch(function(error){
    console.log(error);
  });


});


// 2) Endpoint de reedireccionamiento si la compra es success
router.get('/success/:orderId', async (req, res) => {

  try {

    console.log("New request GET to /mercadopago/success/:orderId");
    let orderId = req.params.orderId;

    let status = await updateStateOrderDB(orderId,"Payment completed. Preparing Order")

    if (status){
      await updateOrderPaymentDB(orderId, 2)
      res.status(200).json({"Message": `Thanks for your purchase. The orderId ${orderId} was successfully paid. You can check the status on our web :) `});
    }else{
      res.status(404).json({"Message": `The orderId ${orderId} doesnt exists`});
    }

    

  } catch (error) {
    res.json(error)
  }

});

// 3) Endpoint de reedireccionamiento si la compra es pending
router.get('/pending/:orderId', async (req, res) => {

  try {

    console.log("New request GET to /mercadopago/pending/:orderId");
    let orderId = req.params.orderId;

    let status = await updateStateOrderDB(orderId,"Pending for the payment")

    if (status)
      res.status(200).json({"Message": `The orderId ${orderId} is still pending for the payment. You can check the status on our web :) `});
    else
      res.status(404).json({"Message": `The orderId ${orderId} doesnt exists`});
    

  } catch (error) {
    res.json(error)
  }

});


// 3) Endpoint de reedireccionamiento si la compra es failure
router.get('/failure/:orderId', async (req, res) => {

  try {

  console.log("New request GET to /mercadopago/failure/:orderId");
  let orderId = req.params.orderId;

  let status = await updateStateOrderDB(orderId,"Payment unsuccessful")

  if (status)
    res.status(200).json({"Message": `The payment for orderId ${orderId} was unsuccessful. Please try again with another way`});
  else
    res.status(404).json({"Message": `The orderId ${orderId} doesnt exists`});

  } catch (error) {
    res.json(error)
  }

});



/////////////////////////////////////////////////////////////
// Exportamos

module.exports = router
