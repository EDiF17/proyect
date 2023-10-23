const fs = require('fs');
const path = require('path');
// const { use } = require('../routes/user');

const usersFilePath = path.join(__dirname, '../data/usersData.json');

function getUsers() {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    return users;
}

const controller = {
    
    login (req, res) {
        return res.render('users/login');
    },

    register (req, res) {
        return res.render('users/register');
    },

    newUser (req, res) {
        const users = getUsers();
        const user = {
            id : users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
            ...req.body,
            // password: bcrypt.hashSync(req.body.password, 10)
        };
        users.push(user);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));
        return res.redirect('/')
    },

    profile (req, res) {
        res.render('users/profile')
    }
}


module.exports = controller;


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

  // create (req, res) {
    //     return res.render('users/userCreate');
    // },