const nodemailer = require('nodemailer');

const sendEmail = async (req, res, next) => {
    try {
        const { name, email, orderNumber, orderDetails } = req.body;

        if (!name || !email || !orderNumber || !orderDetails) {
            return res.status(400).json({ error: 'Tutti i campi sono obbligatori.' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: `Conferma ordine n. ${orderNumber}`,
            html: `
        <h2>Ciao ${name},</h2>
        <p>Grazie per il tuo ordine! Ecco i dettagli:</p>
        <p><strong>Numero ordine:</strong> ${orderNumber}</p>
        <p><strong>Dettagli ordine:</strong></p>
        <pre>${orderDetails}</pre>
        <p>Ti contatteremo presto per la spedizione.</p>
        <p>Grazie per aver scelto il nostro store!</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email di conferma ordine inviata con successo!' });
    } catch (error) {
        console.error('Errore invio email:', error);
        next(error);
    }
};

module.exports = { sendEmail };
