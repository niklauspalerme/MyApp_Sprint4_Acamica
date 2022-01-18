## Sprint Proyect #2 - My APP Persistente

Entrega del proyecto del Sprint #2 sobre **My APP Persistente**. Donde consiste en presentar una api que permite gestionar ordenes de los usuarios del restaurante Delilah Restó. Además se contara con un usuarip Administrador que pueda supervisar toda la aplicación 


## Requerimientos para usar la APP de manera local

- Servidor MySQL
- Servidor Redis
- Node JS


## Pasos para usar la APP de manera local

- Descargar el archivo zip y descomprimir el archivo
- Ejecutar el script ubicado en la carpeta others **create_databse.sql**  en el servidor MySQL
- Instalar paquetes en Node (Ver sección **Instalación de paquetes de Node**)
- Generar variables de entorno (Ver sección **Variables de entorno**)
- Iniciar la api (Ver sección **Ejecución de la APP**)
- Iniciar el test (Ver sección **Ejecucíón del Test**)
- Ver documentación de los endpoints de la APP (Ver sección **Documentación Endpoints (Swagger**)


## Instalación de paquetes de Node

Ejecuete el siguiente comando para iniciar la instalación de los paquetes node del proyecto

 ```bash
  npm install
```

## Variables de entorno

Para ejecutar el proyecto hay que crear las variables en el archivo llamado `.env`. Puede utilizar también el archivo `sample.env` como referencia para su creación

- `PORT` puerto del servidor express (por defecto se sugiere usar 8080)
- `DB_USERNAME` usuario que conecta con permisos de insert/update/delete a la base de MySql
- `DB_PASSWORD` contraseña del usuario
- `DB_NAME` nombre de la base en MySQL
- `DB_PORT` puerto del servidor MySQL
- `DB_HOST` servidor del MySQL
- `REDIS_HOST` servidor del Redis
- `REDIS_PORT` puerto del servidor del redis
- `JWT_PASS` key para armar la valicación por JWT (puede utilizar cualquier valor)

## Ejecución de la APP

Ejecute el siguiente comando:

 ```bash
  npm run dev 
```

## Ejecución del test

Ejecute el siguiente comando:


```bash
  npm run test
```

## Documentación Endpoints (Swagger)

Para poder acceder a la documentación Swagger de la api, por favor acceda al siguiente endpoint como referencia:

```bash
  http://localhost:8080/api-docs/
```

## Postman Collection

Puede encontrar la colección del Postman en la carpeta con el mismo nombre. Acontinuación se da mas detalle acerca de la colección Postman para una mayor comidad y entendimiendo del usuario:


- La colección de Postman va estar dividido por los diferentes endpoints

![postman division](https://github.com/niklauspalerme/imagenes/blob/main/MyApp_Sprint2_Acamica/imagen%202.JPG)

- La gran mayoria de los endpoints van a necesitar un token de **autenticación** en los headers para su uso:

![postman division](https://github.com/niklauspalerme/imagenes/blob/main/MyApp_Sprint2_Acamica/imagen%203.JPG)

- Se sugiere leer la sección **Documentación Endpoints (Swagger)** para poder tener una idea de como usar cada unos de los endpoints


![documentación swagger](https://github.com/niklauspalerme/imagenes/blob/main/MyApp_Sprint2_Acamica/inmagen%204.JPG)

- En postman en la carpeta **User** va ver 2 pestañas para login. Una que va tener las credenciales del usuario admins, que les va servir para poder acceder a ciertos endpoints que estan restringidos

![login admins](https://github.com/niklauspalerme/imagenes/blob/main/MyApp_Sprint2_Acamica/imagen%205.JPG)

- Y la otra pestaña donde despues de haber creado respectivamente su usuario podrá colocar aqui los datos de y asi poder obtener su token de autenticación

![login usuario normal](https://github.com/niklauspalerme/imagenes/blob/main/MyApp_Sprint2_Acamica/imagen%206.JPG)

- Importante a tener en cuenta los token de autenticación van a tener un **Time Out** de 1 hr
