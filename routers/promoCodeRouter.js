const express = require('express')

const router = express.Router()

const Controller = require('../controllers/promoCodeController')

// Index
router.get('/', promoCodeController.index)

module.exports = router