
const db = require('../database/models')

const { validationResult } = require('express-validator');
const { DATE } = require('sequelize');
const { Op } = require('sequelize');

const controller = {
    
    async index(req, res) {
        try {
            const users = await db.User.findAll({
                include: [
                    'countries',
                    'positions'
                ]
            });
            res.render('users/users', { users });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    login (req, res) {
        return res.render('users/login');
        
    },

    // loginProcess (req, res) {
    //     const users = getUsers();
    //     const user = users.find((element) => element.email === req.body.email);
        
    //     const errors = {
    //                 unauthorized: {
    //                     msg: 'Usuario y/o contraseña incorrecto'
    //                 }
    //             };
    //     if (!user) {
    //         return res.render('users/login', { errors });
    //     };
    //     if (!bcrypt.compareSync(req.body.password, user.password)) {
    //         return res.render('users/login', { errors });
    //     };
        
    //     req.session.user = {
    //         timestamp: Date.now(),
    //         id: user.id,
    //         firstName: user.firstName,
    //         email: user.email
    //     }
    //     return res.redirect('/users/profile')
    //     },

    // profileLogin (req,res){
    //     const {user} = req.session
    //     return res.render("users/profile", {user})
    // },

    register (req, res) {
        return res.render('users/register');
    },

    async newUser (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('users/register', { 
                    errors: errors.mapped(),
                    oldData: req.body
                });
            }
        const newUser = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            img : req.file?.filename || 'cancha-prueba.webp',
            age: req.body.age,
            phone: req.body.phone,
            genre: req.body.genre,
            countries_id: req.body.location,
            positions_id: req.body.positions_id,
            roles_id: 3
        };
        db.User.create(newUser);
        return res.redirect('/')
        } catch (error) {
            return res.status(500).send(error);
        }
        }, 
    
    // profile (req, res) {
    //     const users = getUsers();
    //     const user = users.find(element => element.id == req.params.id);
    //     if (!user){
    //         return res.render('error', {    // CREAR VISTA EJS DE ERROR //
    //             message : 'El usuario no existe', 
    //                 error : {
    //                     status : 404
    //         },
    //         path: req.url
    //     });
    // }
    
    // res.render('users/profile', { user });
    // },

    // edit (req, res) {
    //     const users = getUsers();
    //     const user = users.find(element => element.id == req.params.id);
    //     return res.render('users/editUser', { userToEdit : user }); 
    // },

    // update (req, res) {
    //     const users = getUsers();
    //     const userIndex = users.findIndex(element => element.id == req.params.id);
    //     const imgPerfil = req.file?.filename || users[userIndex].imgPerfil;
    //     users[userIndex] = {
    //         ...users[userIndex],   
    //         imgPerfil,
    //         ...req.body
    //     };
    //     fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    //     res.redirect('/user')
    // },

    // async destroy (req, res) {
    //     try {
    //         await db.User.destroy({ where : { id : req.params.id}})
    //     } catch (error) {
    //         return res.status(500).send(error);
    //     }
    //     res.redirect('/users');
    // }
}


module.exports = controller;