const express = require('express')

const router = express.Router()

const promoCodeController = require('../controllers/promoCodeController')

// Index
router.get('/', promoCodeController.index)

module.exports = router