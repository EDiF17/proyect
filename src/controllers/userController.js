const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

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

    register (req, res) {
        return res.render('users/register');
    },

    newUser (req, res) {
        const users = getUsers();

        const errors = validationResult(req);
        // res.send(errors);
        
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

    loginProcess (req, res) {
        return res.sender(req.body)
    }
}


module.exports = controller;