const express = require('express');
const path = require('path');

const router = express.Router();

const logDBPitchMiddleware = require('../middlewares/logDBPitchMiddleware')

const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req, file, cb) =>  {
        cb(null, path.join(__dirname, '../public/img/pitchs'));
    },
    filename : (req, file, cb) => {
        let imageName = 'pitch-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

const uploadFile = multer({ storage });

const pitchsController = require('../controllers/pitchsController');

// const uploadFile = require('../middlewares/multerMiddleware');

/*** GET ALL PITCHS ***/ 
router.get('/', pitchsController.index);

/*** CREATE ONE PITCH ***/
router.get('/create', pitchsController.create);
router.post('/', uploadFile.single('img'), logDBPitchMiddleware, pitchsController.newPitch);

/*** GET ONE PITCH ***/
router.get('/detail/:id', pitchsController.detail);

/*** EDIT ONE PITCH ***/ 
router.get('/edit/:id', pitchsController.edit);
router.put('/:id', uploadFile.single('img'), pitchsController.update);


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', pitchsController.destroy);


module.exports = router;