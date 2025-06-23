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
            html: <div style="
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            color: #333333; 
            background-color: #f9f9f9; 
            padding: 20px; 
            border-radius: 8px; 
            max-width: 600px; 
            margin: auto;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          ">
                <h2 style="color: #2c3e50; font-weight: 600;">Ciao ${name},</h2>
                <p style="font-size: 16px; line-height: 1.5;">Grazie per il tuo ordine! Ecco i dettagli:</p>

                <p style="font-size: 16px; line-height: 1.5;">
                    <strong style="color: #34495e;">Numero ordine:</strong> ${orderNumber}
                </p>

                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 4px;">
                    <strong style="color: #34495e;">Dettagli ordine:</strong>
                </p>

                <pre style="
              background-color: #ecf0f1; 
              padding: 12px; 
              border-radius: 6px; 
              font-family: 'Courier New', Courier, monospace; 
              font-size: 14px; 
              color: #2c3e50; 
              white-space: pre-wrap;
            ">${orderDetails}</pre>

                <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
                    Ti contatteremo presto per la spedizione.
                </p>

                <p style="font-size: 16px; line-height: 1.5; font-weight: 600; color: #2980b9;">
                    Grazie per aver scelto il nostro store!
                </p>
            </div>

            ,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email di conferma ordine inviata con successo!' });
    } catch (error) {
        console.error('Errore invio email:', error);
        next(error);
    }
};

module.exports = { sendEmail };
