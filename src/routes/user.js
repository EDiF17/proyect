const express = require('express');
const path = require('path');
// const multer = require('multer');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/login', userController.login);

router.get('/register', userController.register); // router.get('/create', userController.create);

router.post('/register', userController.newUser);




module.exports = router;



// const guestMiddleware = require('../middlewares/guestMiddleware');
// const { createUserValidation } = require('../middlewares/userValidations');


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../public/img/users'))
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         // const filename = path.basename(file.originalname, ext);
//         // cb(null, `${filename}-${Date.now()}${ext}`)
//         cb(null, `${file.fieldname}-${Date.now()}${ext}`)
//     }
// });
// const upload = multer({ storage });


// router.get('/', guestMiddleware, userController.index);
// router.post('/create', upload.single('img'), createUserValidation, userController.store);