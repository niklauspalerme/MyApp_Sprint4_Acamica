/////////////////////////////////////////////////////////////
// Variables Iniciales 

const express = require('express');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const { agendaRouter } = require('./routers/agenda');
const { orderRouter } = require('./routers/order');
const { paymentMethodRouter } = require('./routers/paymentMethod');
const { productRouter } = require('./routers/product');
const { userRouter } = require('./routers/user');
const cors = require('cors');
const {authRouter} = require('./routers/auth'); // Nuevo
const passport = require('passport'); // Nuevo
const {paymentRouter} = require ('./routers/payment');



/////////////////////////////////////////////////////////////
// Función Principal


const ServerUp = (port = 3000, message= 'The server is ready') =>{

    /////////////////////////////////////////////////////////////
    // Variables 

    const server = express();

    /////////////////////////////////////////////////////////////
    // Swagger

    const swaggerDocs = require('./swagger.json')

    /////////////////////////////////////////////////////////////
    // Global Middlewares

    server.use(express.json());
    server.use(express.urlencoded({extended: false}));
    server.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    server.use(helmet());
    server.use(passport.initialize()); // Nuevo
    server.use(cors()); //Nuevo

    /////////////////////////////////////////////////////////////
    // Routers

    server.use('/agendas', agendaRouter());
    server.use('/mediosDePago', paymentMethodRouter());
    server.use('/products', productRouter());
    server.use('/usuarios', userRouter());
    server.use('/pedidos', orderRouter());
    server.use('/auth', authRouter()); // Ruta de servicios de auth
    server.use(paymentRouter());
    

    /////////////////////////////////////////////////////////////
    //Puerto

    server.listen( port , ()=>{
        console.log(`${message} in port ${port}`)
    })

    return server;
}


/////////////////////////////////////////////////////////////
// Exportamos


module.exports= {ServerUp}