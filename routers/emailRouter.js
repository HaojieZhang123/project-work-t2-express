const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/emailController');

// definizione della rotta POST per inviare un'email
router.post('/', sendEmail);

module.exports = router;