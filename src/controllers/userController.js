
const db = require('../database/models')

const { validationResult } = require('express-validator');
const { DATE } = require('sequelize');
const { Op } = require('sequelize');
const bcrypts = require('bcryptjs');

const controller = {

    // INDEX

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

    // LOGIN

    login (req, res) {
        return res.render('users/login');

    },

    // LOGIN PROCCESS
    async loginProcess (req, res) {
        try {
            const user = await db.User.findOne({ where: { email: req.body.email } });
            const errors = {
                unauthorized: {
                    msg: 'Usuario y/o contraseña incorrecto'
                }
            };
            if (!user) {
                return res.render('users/login', { errors })
            };
            if (!bcrypts.compareSync(req.body.password, user.password)){
                return res.render('users/login', { errors })
            };
            
            if (user) {
                delete user.password;
                req.session.userLogged = user;

                if (req.body.remember_me){
                    res.cookie('userEmail', req.body.email,  { maxAge: (1000 * 60) * 2 });
                }
                return res.redirect('/user/profile');
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    // REGISTER

    register (req, res) {
        return res.render('users/register');
    },

    // NEW USER

    async newUser (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('users/register', {
                    errors: errors.mapped(),
                    oldData: req.body
                });
            }
        
        const userInDB = await db.User.findOne({ where: { email: req.body.email } });

        if (userInDB) {
            return res.render('users/register', {
                errors: {
                    unauthorized: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }

        const newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            genre: req.body.genre,
            email: req.body.email,
            phone: req.body.phone,
            countries_id: req.body.countries_id,
            positions_id: req.body.positions_id,
            img : req.file?.filename || 'cancha-prueba.webp',
            password: req.body.password,
            roles_id: 3
        };
        await db.User.create(newUser);
        return res.redirect('/user/login')
        } catch (error) {
            return res.status(500).send(error);
        }
        },

        // PROFILE 
        profile: (req, res) => {
            console.log(req.cookies.userEmail);
            
            return res.render('users/profile', {
                    user: req.session.userLogged
                });
            },

        // EDIT

        async edit(req, res) {
            try {
                const user = await db.User.findByPk(req.params.id);
                return res.render('users/editUser', { User: user });
            } catch (error) {
                return res.status(500).send(error);
            }
        },

        // UPDATE 

        async update(req, res) {
            try {
                await db.User.update({ ...req.body }, { where: { id: req.params.id } });
                return res.redirect('/user/profile');
            } catch (error) {
                return res.status(500).send(error);
            }
        },

        // DESTROY 

        async destroy (req, res) {
            try {
                await db.User.destroy({ where : { id : req.params.id}})
            }      catch (error) {
                return res.status(500).send(error);
        }
        res.redirect('/user');
    }, 

        logout: (req, res) => {
            res.clearCookie('userEmail');
            req.session.destroy();
            return res.redirect('/');
        } 
    };

module.exports = controller;