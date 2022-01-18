/////////////////////////////////////////////////////////////
// Variables Iniciales 

const {getModel} = require("../../database");
const dbOperationsUser = require("../dbOperations/user");
const dbOperationsAgenda = require("../dbOperations/agenda");
const jwt = require('jsonwebtoken');


/////////////////////////////////////////////////////////////
// Funciones


//1) Función para generar el token de los Auth Services
const generateServicesToken =  async (username,email,name) =>{

    let status =  await userFound(username,email);

    if (status){
        console.log("Handdlers -> generateServicesToken");
        console.log("El usuario existe, manda el token");
        token =  await authenticationToken(username,email)
  
      }else{
        console.log("Handdlers -> generateServicesToken");
        console.log("El usuario no existe, crealo y manda el token")
        await createUserAuthServices(username,email,name)
        token = await authenticationToken(username,email)
      }

      return token;


}


// 2) Buscar la existencia del usuario
const userFound = async (username, email) =>{

    try {

        const User = getModel('User');
        let status = null
        const emailResultDB = await User.findOne({where:{email}}) || null
        const usernameResultDB = await User.findOne({where:{username}}) || null


        //Si el resultado de la query (email) es difernte a null
        if(emailResultDB !== null)
            status = true 
        //Si el resultado de la query (username) es difernte a null
        else if (usernameResultDB !== null )
            status = true
        else
           status = false
        
        return status
        
    } catch (error) {
        console.log(error);
        return error
    }
}


//3) Crear un Usuario con google
const createUserAuthServices = async (username,email,name)=>{
    try {
    
        const mobile = 'Please modify this number'
        const address = 'Please modify this addres to continue'
        const password = username

        let newUser = {
            username,
            name,
            email,
            mobile,
            password,
            admins: false,
            disabled: false
        }

        const userId = await  dbOperationsUser.createUserDB(newUser);
        await dbOperationsAgenda.createAddressDB(address,userId);

        
    } catch (error) {
        console.log(error);
        resp.status(500).send(error);
        
    }
}


//4) Cremos un token de authentication
const authenticationToken = async (username,email)=>{

    try {

        const JWT_PASS = global.process.env.JWT_PASS;
        const User = getModel('User');
        let result = null
        const emailResultDB = await User.findOne({where:{email}}) || null
        const usernameResultDB = await User.findOne({where:{username}}) || null


        //Si el resultado de la query (email) es difernte a null
        if(emailResultDB !== null)
            result = emailResultDB 
        //Si el resultado de la query (username) es difernte a null
        else if (usernameResultDB !== null )
            result = usernameResultDB
        
        const token = jwt.sign(result.toJSON(), JWT_PASS,{ expiresIn: '1h' });
        
        return `Bearer ${token}`
        
    } catch (error) {
        console.log(error);
        return error
    }

}


/////////////////////////////////////////////////////////////
// Exportamos

module.exports={
    generateServicesToken
}