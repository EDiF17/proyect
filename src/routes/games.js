const express = require('express');
const path = require('path');

const router = express.Router();

const gamesController = require('../controllers/gamesController');


/*** GET ALL GAMES ***/ 
router.get('/', gamesController.index);


/*** GET ONE GAME ***/
// router.get('/detail/:id', gamesController.detail);


module.exports = router;
