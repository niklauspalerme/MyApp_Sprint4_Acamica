/////////////////////////////////////////////////////////////
// Variables Iniciales


const { config } = require('dotenv');
const { connect } = require('./database');
const { initialize } = require('./database/initialize');
const { ServerUp } = require('./server');
//Cargamaos los servicios de autenticación
require('./services');

/////////////////////////////////////////////////////////////
// Función Principal


async function main() {

    try{

        //////////////////////////////////////////////////////////
        //Accedemos al .env

        config();

        /////////////////////////////////////////////////////////
        //Variables

        const PORT = process.env.PORT || 3000;
        const {DB_USERNAME,DB_PASSWORD,DB_NAME, DB_PORT, DB_HOST,} = process.env;

        /////////////////////////////////////////////////////////
        //DB - Configuraciones

        //Hago la conexión a la DB y sincronizacion de las tablas
        await connect(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME);
        
        //Inserto algunos records
        await initialize();

        /////////////////////////////////////////////////////////
        //Server

        ServerUp(PORT)

    }catch(error){

        console.log("Error en Main..... ", error);
    }
}


/////////////////////////////////////////////////////////////
// Invocamos la función Principal


main();