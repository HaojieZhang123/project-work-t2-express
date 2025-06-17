const express = require('express')

const router = express.Router()

const productCategoryController = require('../controllers/productCategoryController')

// Index
router.get('/', productCategoryController.index)

module.exports = router