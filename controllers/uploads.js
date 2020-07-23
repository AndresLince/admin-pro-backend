const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require("../helpers/actualizar-imagen");

const fileUpload=(req,res=response)=>{

    const tipo=req.params.tipo;
    const id=req.params.id;

    //Validar tipo
    const tiposValidos=['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:true,
            msg:'no es un tipo valido'
        })
    }
    //Validar de que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {

        return res.status(400).json({
            ok:true,
            msg:'No hay ningun archivo'
        })
    }

    //Procesar la imagen
    const file=req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo=nombreCortado[nombreCortado.length-1];

    const extensionesValidar=['png','jpg','jpeg','gif'];
    if(!extensionesValidar.includes(extensionArchivo)){
        return res.status(400).json({
            ok:true,
            msg:'no es una extension valida'           
        })
    }

    //Generar el nombre del archivo

    const nombreArchivo=`${uuidv4()}.${extensionArchivo}`;
    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    // mover la imagen
    file.mv(path, (err)=> {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok:true,
                msg:'Error al mover la imagen'                
            })
        } 

        //Actualizar base de datos
        actualizarImagen(tipo,id,nombreArchivo);
        res.json({
            ok:true,
            msg:'Archivo subido',
            nombreArchivo
        })
    });   

}

module.exports={
    fileUpload
}