/*
Ruta: /api/hospitales
*/

const {Router}= require('express');
const {check}= require('express-validator');
const {validarCampos}=require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id',validarJWT,fileUpload);

module.exports = router;