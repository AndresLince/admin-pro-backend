/*
Ruta: /api/hospitales
*/

const {Router}= require('express');
const {check}= require('express-validator');
const {getTodos,getDocumentosColeccion} = require('../controllers/busquedas');
const {validarCampos}=require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda',validarJWT,getTodos);
router.get('/coleccion/:tabla/:busqueda',validarJWT,getDocumentosColeccion);

module.exports = router;