const nodemailer = require('nodemailer');

const sendOrderConfirmationEmail = async (req, res) => {
    try {
        const { name, surname, email, phone, address, shipping_cost, products } = req.body;

        if (!name || !email || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Missing or invalid required fields' });
        }

        // Generate a fake order number
        const orderNumber = `ORD-${Date.now()}`;

        // Prepare order details as a readable string
        const orderDetails = products
            .map(p => `Product ID: ${p.product_id} - Quantity: ${p.quantity}`)
            .join('\n');

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Prepare the HTML message
        const htmlMessage = `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        color: #333333; 
        background-color: #f9f9f9; 
        padding: 20px; 
        border-radius: 8px; 
        max-width: 600px; 
        margin: auto;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      ">
        <h2 style="color: #2c3e50; font-weight: 600;">Hello ${name} ${surname},</h2>
        <p style="font-size: 16px; line-height: 1.5;">Thank you for your order! Here are the details:</p>
        <p style="font-size: 16px; line-height: 1.5;">
          <strong style="color: #34495e;">Order Number:</strong> ${orderNumber}
        </p>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 4px;">
          <strong style="color: #34495e;">Order Details:</strong>
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
          Shipping Address: ${address}<br>
          Phone: ${phone}<br>
          Shipping Cost: €${shipping_cost.toFixed(2)}
        </p>
        <p style="font-size: 16px; line-height: 1.5; font-weight: 600; color: #2980b9;">
          Thank you for choosing our store!
        </p>
      </div>
    `;

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Order Confirmation ${orderNumber}`,
            html: htmlMessage,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { sendOrderConfirmationEmail };
