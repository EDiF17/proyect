const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');
const { DATE } = require('sequelize');

const usersFilePath = path.join(__dirname, '../data/usersData.json');

function getUsers() {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    return users;
}

const controller = {

    index (req, res) {
        const users = getUsers();
        return res.render('users/users', { users });
    },
    
    login (req, res) {
        return res.render('users/login');
        
    },

    loginProcess (req, res) {
        const users = getUsers();
        const user = users.find((element) => element.email === req.body.email);
        
        const errors = {
                    unauthorized: {
                        msg: 'Usuario y/o contraseña incorrecto'
                    }
                };
        if (!user) {
            return res.render('users/login', { errors });
        };
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.render('users/login', { errors });
        };
        
        req.session.user = {
            timestamp: Date.now(),
            id: user.id,
            firstName: user.firstName,
            email: user.email
        }
        return res.redirect('/users/profile')
        },

    profileLogin (req,res){
        const {user} = req.session
        return res.render("users/profile", {user})
    },

    register (req, res) {
        return res.render('users/register');
    },

    newUser (req, res) {
        const users = getUsers();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/register', { 
                errors: errors.mapped(),
                oldData: req.body
            });
        } 
        const user = {
            id : users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
            ...req.body,
            imgPerfil : req.file?.filename || 'cancha-prueba.webp',
            password : bcrypt.hashSync(req.body.password, 10),
        };
        users.push(user);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));
        return res.redirect('/user')
    },

    profile (req, res) {
        const users = getUsers();
        const user = users.find(element => element.id == req.params.id);
        if (!user){
            return res.render('error', {    // CREAR VISTA EJS DE ERROR //
                message : 'El usuario no existe', 
                    error : {
                        status : 404
            },
            path: req.url
        });
    }
    
    res.render('users/profile', { user });
    },

    edit (req, res) {
        const users = getUsers();
        const user = users.find(element => element.id == req.params.id);
        return res.render('users/editUser', { userToEdit : user }); 
    },

    update (req, res) {
        const users = getUsers();
        const userIndex = users.findIndex(element => element.id == req.params.id);
        const imgPerfil = req.file?.filename || users[userIndex].imgPerfil;
        users[userIndex] = {
            ...users[userIndex],   
            imgPerfil,
            ...req.body
        };
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.redirect('/user')
    },

    destroy (req, res) {
        const users = getUsers();
        const userIndex = users.findIndex(element => element.id == req.params.id);
        users.splice(userIndex, 1);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.redirect('/user');
        },
    }



module.exports = controller;