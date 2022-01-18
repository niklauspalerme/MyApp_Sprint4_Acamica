/////////////////////////////////////////////////////////////
// Variables Iniciales

const { createAddressDB } = require("../dbOperations/agenda");
const { getAllUsersDB, getOneUserDB, deleteUserDB, updateDisabledUserDB, deleteAddressUserDB, updateUserDB } = require("../dbOperations/user")
const dbOperationsUser = require("../dbOperations/user");
const dbOperationsAgenda = require("../dbOperations/agenda");


/////////////////////////////////////////////////////////////
// Funciones


//1) Función para obtener todos los usuarios
const getAllUsers = async (req,resp)=>{

    try {
        const data = await getAllUsersDB();
        resp.status(200).json(data)
        
    } catch (error) {
        console.log(error);
        resp.status(500).send(error);
        
    }
}


//2) Función para obtener un usuario
const getOneUser = async(req,resp)=>{
    try {
        const data = await getOneUserDB(req.headers.authentication);
        resp.status(200).json(data)
        
    } catch (error) {
        console.log(error);
        resp.status(500).send(error);
        
    }
}


//3
const deleteUser = async(req,resp)=>{
    try {
        
        const {userId}= req.params;
        if (userId ===1)
            resp.status(403).json({"Message": "Operación Prohibida. No se puede eliminar al Admins #1"});
        else{
            await deleteUserDB(userId);
            await deleteAddressUserDB(userId);
        }

        resp.status(200).json({"Message": `El usuario ${userId} ha sido eliminado`})
        
    } catch (error) {
        console.log(error);
        resp.status(500).send(error);
        
    }
}


//4 - Crear un Usuario
const createUser = async (req,resp)=>{
    try {
    
        const {username, name,email,mobile,address,password} = req.body;

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

        resp.status(201).json({"Message": `El usuario ha sido creado - userId: ${userId}`})
        
    } catch (error) {
        console.log(error);
        resp.status(500).send(error);
        
    }
}


//4 - Crear un Usuario
const createUserGoogle = async (req,resp)=>{
    try {
    
        const {username, name,email,mobile,address,password} = req.body;

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

        resp.status(201).json({"Message": `El usuario ha sido creado - userId: ${userId}`})
        
    } catch (error) {
        console.log(error);
        resp.status(500).send(error);
        
    }
}




const updateDisabledUser = async (req,resp)=>{
    try {
    
        const {disabled} = req.body;
        const {userId}= req.params;

        if(userId === '1')
            resp.status(403).json({"Message": `Operación prohibida. No puede modificar el siguiente userId: ${userId}`})
        else{
            await updateDisabledUserDB (userId, disabled);
            resp.status(201).json({"Message": `El usuario ha sido modificado - userId: ${userId}`})
        }
            
    } catch (error) {
        console.log(error);
        resp.status(500).send(error);
        
    }
}


const updateUser = async (req,resp)=>{
    try {
    
        const {name, mobile} = req.body;
        await updateUserDB(req.headers.authentication, name, mobile);

    
        resp.status(201).json({"Message": `El usuario ha sido modificado`})
        
            
    } catch (error) {
        console.log(error);
        resp.status(500).send(error);
        
    }
}


/////////////////////////////////////////////////////////////
// Funciones

module.exports={
    getAllUsers,
    getOneUser,
    deleteUser,
    createUser,
    updateDisabledUser,
    updateUser
}