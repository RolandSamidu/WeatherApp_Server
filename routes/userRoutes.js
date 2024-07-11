const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @route   POST api/users
// @desc    Add new user
router.post('/', userController.addUser);

// @route   PUT api/users/:id/location
// @desc    Update user location
router.put('/:id/location', userController.updateLocation);

module.exports = router;
