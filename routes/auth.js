const express = require('express');
const { check } = require('express-validator');


const authController = require('../controllers/auth');

const router = express.Router();

router.get('/ingresar', authController.getIngresar);

router.post('/ingresar', authController.postIngresar);

router.get('/registrarse', authController.getRegistrarse);

router.post('/registrarse', check('email')
    .isEmail()
    .withMessage('Por favor ingrese un email valido'), authController.postRegistrarse);

router.post('/salir', authController.postSalir);

router.get('/reinicio', authController.getReinicio);

router.post('/reinicio', authController.postReinicio);

router.get('/reinicio/:token', authController.getNuevoPassword);

router.post('/nuevo-password', authController.postNuevoPassword);


module.exports = router;