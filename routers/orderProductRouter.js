const express = require('express');
const orderProductController = require('../controllers/orderProductController');
const orderProductRouter = express.Router();

// Store
orderProductRouter.post('/', orderProductController.store);

module.exports = orderProductRouter;