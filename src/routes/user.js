const express = require('express');
const path = require('path');

const router = express.Router();

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

const upload = multer({ storage });

const userController = require('../controllers/userController');

/*** GET ALL USERS ***/
router.get('/', userController.index);

/*** CREATE ONE USER ***/
router.get('/register', userController.register);
router.post('/register', upload.single('imgPerfil'), userController.newUser);

/*** GET ONE USER ***/
router.get('/profile/:id', userController.profile);

/*** EDIT ONE USER ***/
router.get('/edit/:id', userController.edit);
router.put('/:id', upload.single('imgPerfil'), userController.update);

/*** DELETE ONE USER***/ 
router.delete('/:id', userController.destroy);

/*** FORM TO LOGIN ***/ 
router.get('/login', userController.login);

// FALTA PROCESO COMPLETO DE LOGIN


module.exports = router;



// const guestMiddleware = require('../middlewares/guestMiddleware');
// const { createUserValidation } = require('../middlewares/userValidations');
