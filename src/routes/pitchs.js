const express = require('express');

const router = express.Router();

const pitchsController = require('../controllers/pitchsController');


/*** GET ALL PITCHS ***/ 
router.get('/', pitchsController.index);

/*** CREATE ONE PITCH ***/
router.get('/create', pitchsController.create);
router.post('/', pitchsController.newPitch);

/*** GET ONE PITCH ***/
// router.get('/detail/:id', pitchsController.detail);

router.get('/detail/', pitchsController.detail);

/*** EDIT ONE PITCH ***/ 
router.get('/:id/edit', pitchsController.edit);
router.put('/:id', pitchsController.update);

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', pitchsController.destroy);




module.exports = router;