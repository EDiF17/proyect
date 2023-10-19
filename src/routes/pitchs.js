const express = require('express');

const pitchsController = require('../controllers/pitchsController');

const router = express.Router();

router.get('/', pitchsController.pitchs);

router.get('/detail', pitchsController.detail);






module.exports = router;