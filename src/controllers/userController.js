
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
            console.log(req.body.password);
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
            return res.redirect('/pitchs');
            // profile: (req, res) => {
		
            //     return res.render('profile', {
            //         user: req.session.userLogged
            //     });
        
            // },
        } catch (error) {
            return res.status(500).send(error);
        }
    //     req.session.user = {
    //         timestamp: Date.now(),
    //         id: user.id,
    //         firstName: user.firstName,
    //         email: user.email
    //     }
    //     return res.redirect('/users/profile')
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

        async profile (req, res) {
        try {
            const user = await db.User.findByPk(req.params.id);
            res.render('users/profile', { user });
        } catch (error) {
            res.status(500).send(error);
            }
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
                return res.redirect('/user');
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
    }
    };

module.exports = controller;