const Usuario=require('../models/usuario');
const {response}=require('express');
const bcrypt=require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req,res)=>{

    const desde=Number(req.query.desde)||0;    

    const [usuarios,total]=await Promise.all([Usuario.find({},'nombre email role google img')
        .skip(desde)
        .limit(5),
        Usuario.countDocuments()
    ]);

    res.status(200).json({
        ok:true,
        msg:'Hola mundo',
        usuarios,
        uid:req.uid,
        total
    });
};


const crearUsuario = async(req,res)=>{

    const {email,password}=req.body;
   

    try{

        const existeEmail=await Usuario.findOne({email});

        if(existeEmail){

            return res.status(400).json({
                ok:false,
                msg:'El correo ya está registrado.'
            });
        }

        const usuario=await Usuario(req.body);

        //Encriptar contraseñas
        const salt = bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt);

        //Guardar usuario
        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok:true,
            usuario,
            token    
        });
    
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:true,        
            msg:'Error inexperado'          
        });
    }


    
};
const actualizarUsuario=async(req,res)=>{

    //TODO: Validar token y comprobar si es el usuario correcto
    const uid=req.params.id;

    try{

        const usuarioDB=await Usuario.findById(uid);

        if(!usuarioDB){

            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario con ese id'
            });
        }

        //Actualizaciones
        const {password,google,email,...campos}=req.body;
        if(usuarioDB.email!==email){

            const existeEmail=await Usuario.findOne({email});
            if(existeEmail){

                return res.status(404).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese email'
                });
            }
        }  
           
        campos.email=email;

        const usuarioActualizado=await Usuario.findByIdAndUpdate(uid,campos,{new:true});
        
        res.status(200).json({
            ok:true,
            usuario:usuarioActualizado      
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'Error inexperado por favor revisa los logs'          
        });
    }
}

const borrarUsuario=async(req,res)=>{

    const uid=req.params.id;
    
    try{

        const usuarioDB=await Usuario.findById(uid);

        if(!usuarioDB){

            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok:true,
            msg:'Usuario eliminado'      
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'Error inexperado por favor revisa los logs'          
        });
    }
}

module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}