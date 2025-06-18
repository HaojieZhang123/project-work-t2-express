const express = require('express')

const router = express.Router()

const productController = require('../controllers/productController')

// Index
router.get('/', productController.index)

// Best sellers
router.get('/special/best-sellers', productController.bestSellers)

// Latest products
router.get('/special/latest-products', productController.latestProducts)

// Show
router.get('/:id', productController.show)

// Store
router.post('/', productController.store)

// Update
router.put('/:id', productController.update)

// Modify
router.patch('/:id', productController.modify)

// Destroy
router.delete('/:id', productController.destroy)




module.exports = router