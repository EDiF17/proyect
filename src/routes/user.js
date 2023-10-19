const express = require('express');
const path = require('path');
// const multer = require('multer');

const userController = require('../controllers/userController');

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

const router = express.Router();

// router.get('/', guestMiddleware, userController.index);
// router.post('/create', upload.single('img'), createUserValidation, userController.store);

router.get('/login', userController.login);

router.get('/register', userController.register);
router.post('/', userController.newUser);

// router.get('/create', userController.create);


module.exports = router;