const express = require('express');
const { check, body } = require('express-validator');


const authController = require('../controllers/auth');

const router = express.Router();

router.get('/ingresar', authController.getIngresar);

router.post('/ingresar', authController.postIngresar);

router.get('/registrarse', authController.getRegistrarse);

router.post('/registrarse', 
    [
        check('email')
          .isEmail()
          .withMessage('Por favor ingrese un email valido')
          .custom((value, { req }) => {
            if (value === 'no-reply@gmail.com') {
              throw new Error('Este email no permitido');
            }
            return true;
          }),
        body(
          'password',
          'Por favor ingrese un password que tenga solo letras o números y no menos de 5 caracteres.'
        )
          .isLength({ min: 5 })
          .isAlphanumeric(),
        body('passwordConfirmado').custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Passwords no coinciden!');
          }
          return true;
        })
    ],
    authController.postRegistrarse);

router.post('/salir', authController.postSalir);

router.get('/reinicio', authController.getReinicio);

router.post('/reinicio', authController.postReinicio);

router.get('/reinicio/:token', authController.getNuevoPassword);

router.post('/nuevo-password', authController.postNuevoPassword);


module.exports = router;