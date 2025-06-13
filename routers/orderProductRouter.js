const express = require('express');
const order_productController = require('../controllers/order_productController');
const order_pproductRouter = express.Router();

// Store
order_productRouter.post('/', orderController.store);

module.exports = order_productRouter;