const express = require('express')

const router = express.Router()

const promoCodeController = require('../controllers/promoCodeController')

// Index
router.get('/', promoCodeController.index)

// Show
router.get('/:id', promoCodeController.show)

module.exports = router