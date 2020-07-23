const {Schema,model} = require('mongoose');

const HospitalSchema = Schema({

    nombre:{
        type:String,
        required:true
    },    
    img:{
        type:String
    },
    usuario:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }    
},{collection:'hospitales'});

module.exports = model('Hospital',HospitalSchema);