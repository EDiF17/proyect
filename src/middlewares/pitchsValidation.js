const { body } = require('express-validator');

const createPitchsValidations = [
    body('name')
        .notEmpty().withMessage('El campo nombre es requerido!').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener mas de dos caracteres'),

    // DESARROLLAR VERIFICACION DE UBICACION 
    // body('countries_id')
    //   .notEmpty().withMessage('El campo ubicación es requerido!'),

    body('phone')
        .notEmpty().withMessage('El campo número de contacto es requerido!').bail()
        .isInt()
        .isLength({ min: 10, max: 10 }).withMessage('Debe ingresar un número válido'),
    
    body('email')
        .notEmpty().withMessage('El campo email es requerido!').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),

    body('description')
        .notEmpty().withMessage('Debe colocar una descripción').bail()
        .isLength({ min: 10 }).withMessage('Debe colocar una descripción más larga'),
    
    body('hours_price')
        .notEmpty().withMessage('Debe colocar un precio').bail()
        .isNumeric()
];

module.exports = { createPitchsValidations };