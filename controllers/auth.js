const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt=require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req,res=response)=>{

    const {email,password}=req.body;
  
    try {
        //Se puede demorar un poco el login esperando 1 segundo para evitar que nos ataquen
        const usuarioDB=await Usuario.findOne({email});

        if(!usuarioDB){

            res.status(400).json({
                ok:false,
                msg:'Email no encontrado'      
            });
        }

        //verificar contraseña
        const validPassword=bcrypt.compareSync(password,usuarioDB.password);
        if(!validPassword){

            res.status(400).json({
                ok:false,
                msg:'Password no valido'      
            });
        }

        //Generar el token -JWT
        const token = await generarJWT(usuarioDB.id);
        
        res.status(200).json({
            ok:true,
            token      
        });
    } catch (error) {

        res.status(500).json({
            ok:false,
            msg:'Hable con el amdministrador'
        });
    }
} 

module.exports = {
    login
}