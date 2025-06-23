const express = require('express');
const router = express.Router();
const { sendOrderConfirmationEmail } = require('../controllers/emailController');

// definizione della rotta POST per inviare un'email
router.post('/', sendOrderConfirmationEmail);

module.exports = router;