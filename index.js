const express = require('express');
const cors = require('cors');
require('dotenv').config();


const {dbConnection}=require('./database/config');
//Crear el servidor de express
const app=express();

//Configurar cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//directorio público
app.use(express.static('public'));

//Rutas

app.use('/api/usuarios',require('./routes/usuarios')); 
app.use('/api/medicos',require('./routes/medicos')); 
app.use('/api/hospitales',require('./routes/hospitales')); 
app.use('/api/todo',require('./routes/busquedas')); 
app.use('/api/upload',require('./routes/uploads')); 
app.use('/api/login',require('./routes/auth')); 


app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en puerto: '+process.env.PORT);
});

//'mongodb://localhost:27017/hospitalDB'