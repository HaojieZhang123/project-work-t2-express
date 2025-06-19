const express = require('express')

const router = express.Router()

const productController = require('../controllers/productController')

// Index
router.get('/', productController.index)

// Search
router.get('/search', productController.search)

// Show
router.get('/:slug', productController.show)

// Store
router.post('/', productController.store)

// Update
router.put('/:slug', productController.update)

// Modify
router.patch('/:slug', productController.modify)

// Destroy
router.delete('/:slug', productController.destroy)

// Best sellers
router.get('/special/best-sellers', productController.bestSellers)

// Latest products
router.get('/special/latest-products', productController.latestProducts)

// related
router.get('/:slug/related', productController.related);



module.exports = router