const express = require('express');

const router = express.Router();

const usersAPIController = require('../../controllers/api/usersAPIController');

router.get('/users', usersAPIController.list); 

router.get('/users/:id', usersAPIController.detail);

module.exports = router;