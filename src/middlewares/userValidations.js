const { body } = require('express-validator');

const createUserValidations = [
    body('firstName')
        .notEmpty().withMessage('El campo nombre es requerido!').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener mas de dos caracteres'),
    body('lastName')
        .notEmpty().withMessage('El campo apellido es requerido!').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener mas de dos caracteres'),
    body('email')
        .notEmpty().withMessage('El campo email es requerido!').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('phone')
        .notEmpty().withMessage('El campo número de contacto es requerido!').bail()
        .isInt()
        .isLength({ min: 10, max: 10 }).withMessage('Debe ingresar un número válido'),
    body('location')
        .notEmpty().withMessage('El campo ubicación es requerido!'),
    body('password')
        .notEmpty().withMessage('El campo contraseña es requerido!').bail()
        .isLength({ min: 6 }).withMessage('La contraseña debe contener al menos seis caracteres')
];

module.exports = { createUserValidations };



// const path = require('path');


// body('imgPerfil')
    //     .custom((value, { req }) => {
    //         let file = req.file;
    //         let acceptedExtensions = ['.jpg', '.png', '.gif', '.webp', '.svg'];
    //         if (!file) {
    //             throw new Error('Tienes que subir una imagen');
    //         } else {
    //             let fileExtension = path.extname(file.originalname);
    //             if (!acceptedExtensions.includes(fileExtension)) {
    //                 throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
    //             }
    //         }
    
    //         return true;
    //     })