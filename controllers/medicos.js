const {response} = require('express');
const Medico=require('../models/medico');

const getMedicos=async(req,res=response)=>{

    const medicos= await Medico.find()
        .populate('usuario','nombre img').populate('hospital','nombre img');

    res.json({
        ok:true,
        medicos
    })
}

const crearMedico=async(req,res=response)=>{

    const uid=req.uid;
    const medico = new Medico({
        usuario:uid,
        ...req.body
    });
    
    

    try {
        
        const medicoDB = await medico.save();
        res.status(201).json({
            ok:true,
            medicoDB
        })
    } catch (error) {

        res.status(500).json({
            ok:true,
            msg:'Error inesperado'    
        });
    }
}

const actualizarMedico=async(req,res=response)=>{

    const id=req.params.id;
    const uid=req.uid;   

    try {        

        const medico= await Medico.findById(id);

        if(!medico){

            res.status(404).json({
                ok:true,
                msg:'Medico no encontrado' 
            });
        }

        const cambiosMedico={
            ...req.body,
            usuario:uid
        }

        const medicoActualizado=await Medico.findByIdAndUpdate(id,cambiosMedico,{new:true});
        
        res.json({
            ok:true,            
            medico:medicoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'Error Hable con el administrador' 
        });
    }
}

const borrarMedico=async (req,res=response)=>{

    const id=req.params.id;    

    try {        

        const medico= await Medico.findById(id);

        if(!medico){

            res.status(404).json({
                ok:true,
                msg:'Medico no encontrado' 
            });
        }

        const medicoEliminado = await Medico.findOneAndDelete(id);        
        
        res.status(200).json({
            ok:true,            
            msg:'Medico eliminado'
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'Hable con el administrador' 
        });
    }
}

module.exports={
    getMedicos,
    crearMedico,
    borrarMedico,
    actualizarMedico
}