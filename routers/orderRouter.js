const express = require('express');
const orderController = require('../controllers/orderController');
const orderRouter = express.Router();

// Store
orderRouter.post('/', orderController.store);

module.exports = orderRouter;