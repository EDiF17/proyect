const { body } = require('express-validator');

const createUserValidations = [
    body('first_name')
        .notEmpty().withMessage('El campo nombre es requerido!').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener mas de dos caracteres'),
    body('last_name')
        .notEmpty().withMessage('El campo apellido es requerido!').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener mas de dos caracteres'),
    body('age')
        .notEmpty().withMessage('El campo edad es requerido!').bail()
        .isNumeric().withMessage('Debes ingresar una edad válido'),
    
        // body('genre')
    //     .notEmpty().withMessage('Debes seleccionar tu género').bail(),
    // DESARROLLAR VERIFICACION DE GENERO 
    
    body('email')
        .notEmpty().withMessage('El campo email es requerido!').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('phone')
        .notEmpty().withMessage('El campo número de contacto es requerido!').bail()
        .isInt()
        .isLength({ min: 10, max: 10 }).withMessage('Debe ingresar un número válido'),
    
        // body('countries_id')
    //     .notEmpty().withMessage('El campo ubicación es requerido!'),
        // DESARROLLAR VERIFICACION DE UBICACION 

    // body('positions_id')
    //     .notEmpty().withMessage('Debes seleccionar tu posición preferida'),
        // DESARROLLAR VERIFICACION DE POSICION 

    body('password')
        .notEmpty().withMessage('El campo contraseña es requerido!').bail()
        .isLength({ min: 6 }).withMessage('La contraseña debe contener al menos seis caracteres')
];

module.exports = { createUserValidations };
