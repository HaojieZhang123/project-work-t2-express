const express = require('express');
const order_productController = require('../controllers/order_productController');
const order_productRouter = express.Router();

// Store
order_productRouter.post('/', order_productController.store);

module.exports = order_productRouter;