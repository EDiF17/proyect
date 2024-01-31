const express = require('express');

const router = express.Router();

const pitchsAPIController = require('../../controllers/api/pitchsAPIController');

router.get('/pitchs/:id', pitchsAPIController.detail);

router.get('/pitchs', pitchsAPIController.list); 

router.get('/search', pitchsAPIController.search);


module.exports = router;