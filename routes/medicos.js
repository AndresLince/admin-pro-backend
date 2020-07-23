/*
Medicos
Ruta: /api/medicos
*/

const {Router}= require('express');
const {check}= require('express-validator');
const {getMedicos, crearMedico, borrarMedico, actualizarMedico} = require('../controllers/medicos');
const {validarCampos}=require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getMedicos);
router.post('/',
    [
        validarJWT,
        check('hospital','El hospital id debe ser valido').isMongoId(),
        check('nombre','El nombre es requerido').not().isEmpty(),
        validarCampos
    ],
    crearMedico);

router.put('/:id',
[
    
],actualizarMedico);
router.delete('/:id',[],borrarMedico);

module.exports = router;