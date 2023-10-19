// const { validationResult } = require('express-validator');

// const controller = {
//     index(req, res) {
//         return res.render('user', { user: req.user });
//     },
//     create(req, res) {
//         return res.render('userCreate');
//     },
//     store(req, res) {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.render('userCreate', { 
//                 errors: errors.mapped(),
//                 oldData: req.body
//             });
//         }
//         return res.send({...req.body, img: req.file.filename});
//     }
// };
const controller = {
    
    login (req, res) {
        return res.render('users/login');
    },

    register (req, res) {
        return res.render('users/register');
    },
    
    // create (req, res) {
    //     return res.render('users/userCreate');
    // },

    newUser (req, res) {
        // logica de creacion de usuario 
    }
}



module.exports = controller;