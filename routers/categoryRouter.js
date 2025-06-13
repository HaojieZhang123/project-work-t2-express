const express = require('express')

const router = express.Router()

const Controller = require('../controllers/categoryController')

// Index
router.get('/', categoryController.index)

module.exports = router