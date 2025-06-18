const express = require('express');
const orderController = require('../controllers/orderController');
const orderRouter = express.Router();

// Store
orderRouter.post('/', orderController.store);

// Store Order with Products
orderRouter.post('/withproducts', orderController.storeOrder);

module.exports = orderRouter;