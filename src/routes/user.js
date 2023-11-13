const express = require('express');
const path = require('path');
const { check } = require('express-validator');

const router = express.Router();

// const logDBUserMiddleware = require('../middlewares/logDBUserMiddleware')
const { createUserValidations } = require('../middlewares/userValidations');

const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req, file, cb) =>  {
        cb(null, path.join(__dirname, '../public/img/users'));
    },
    filename : (req, file, cb) => {
        let imageName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

const uploadFile = multer({ storage }) 

const userController = require('../controllers/userController');

// const uploadFile = require('../middlewares/multerMiddleware');

/*** GET ALL USERS ***/
router.get('/', userController.index);

/*** CREATE ONE USER ***/
router.get('/register', userController.register);
router.post('/register', uploadFile.single('imgPerfil'), createUserValidations,  userController.newUser);

/*** GET ONE USER ***/
router.get('/profile/:id', userController.profile);

/*** EDIT ONE USER ***/
router.get('/edit/:id', userController.edit);
router.put('/:id', uploadFile.single('imgPerfil'), userController.update);

/*** DELETE ONE USER***/ 
router.delete('/:id', userController.destroy);

/*** FORM TO LOGIN ***/ 
router.get('/login', userController.login);
router.post('/login', createUserValidations, userController.loginProcess);
// FALTA PROCESO COMPLETO DE LOGIN


module.exports = router;



// const guestMiddleware = require('../middlewares/guestMiddleware');
// const { createUserValidation } = require('../middlewares/userValidations');
