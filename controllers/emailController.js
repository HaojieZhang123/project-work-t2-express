const nodemailer = require('nodemailer');
const pool = require('../data/db'); // il pool mysql

function getFullProductDetails(products, callback) {
    if (!Array.isArray(products) || products.length === 0) return callback(null, []);

    const ids = products.map(p => p.product_id);
    const placeholders = ids.map(() => '?').join(',');

    pool.query(
        `SELECT id, product_name, price, discount, image FROM products WHERE id IN (${placeholders})`,
        ids,
        (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        }
    );
}

function sendOrderConfirmationEmail(req, res) {
    const { name, surname, email, phone, address, products } = req.body;

    if (!name || !email || !products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Missing or invalid required fields' });
    }

    getFullProductDetails(products, (err, fullProducts) => {
        if (err) {
            console.error('Errore recupero prodotti:', err);
            return res.status(500).json({ error: 'Errore recupero prodotti' });
        }

        const detailedProducts = fullProducts.map(fp => {
            const prod = products.find(p => p.product_id === fp.id);
            const price = Number(fp.price);
            const discount = Number(fp.discount) || 0;
            const discountedPrice = discount > 0
                ? price - (price * discount / 100)
                : price;
            return {
                ...fp,
                price,
                discount,
                discountedPrice,
                quantity: prod ? prod.quantity : 0,
            };
        });

        const totalProductsPrice = detailedProducts.reduce(
            (acc, p) => acc + p.discountedPrice * p.quantity,
            0
        );

        const shippingCostFinal = totalProductsPrice > 50 ? 0.00 : 5.00;
        const finalTotal = totalProductsPrice + shippingCostFinal;
        const orderNumber = `ORD-${Date.now()}`;

        const orderDetailsHTML = detailedProducts.map(p => `
      <div style="display:flex; align-items:center; margin-bottom: 12px; border-bottom: 1px solid #a8bba2; padding-bottom: 12px;">
        <img src="${p.image}" alt="${p.product_name}" 
             style="width: 80px; height: 80px; object-fit: cover; border-radius: 6px; margin-right: 16px; background-color: #f0f0f0; border: 1px solid #ccc;" />
        <div>
          <p style="margin:0; font-weight:600; color: #f9e6d8;">${p.product_name}</p>
          <p style="margin: 4px 0;">
            Price: ${p.discount > 0
                ? `<span style="text-decoration: line-through; color: #888;">€${p.price.toFixed(2)}</span> <span style="color: #f9e6d8;">€${p.discountedPrice.toFixed(2)}</span>`
                : `€${p.price.toFixed(2)}`
            }
          </p>
          <p style="margin:0;">Quantity: ${p.quantity}</p>
          <p style="margin:0; font-weight: 600; color: #a8bba2;">Total: €${(p.discountedPrice * p.quantity).toFixed(2)}</p>
        </div>
      </div>
    `).join('');

        const htmlMessage = `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        color: #333; 
        background-color: #0000; 
        padding: 24px; 
        border-radius: 8px; 
        max-width: 700px; 
        margin: auto;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border: 1px solid #d3c5b0;
      ">
        <h2 style="color: #f9e6d8;">Hello ${name} ${surname},</h2>
        <p style="font-size: 16px; line-height: 1.5;">Thank you for your order! Here are the details:</p>

        <p style="font-size: 16px; line-height: 1.5;">
          <strong style="color: #a8bba2;">Order number:</strong> ${orderNumber}
        </p>

        <h3 style="color: #a8bba2; margin-top: 20px;">Ordered products:</h3>
        ${orderDetailsHTML}

        <p style="font-size: 16px; margin-top: 20px; color: #a8bba2;">
          <strong>Products total:</strong> €${totalProductsPrice.toFixed(2)}<br>
          <strong>Shipping cost:</strong> €${shippingCostFinal.toFixed(2)}<br>
          <strong style="font-size: 18px; color: #f9e6d8;">Order total:</strong> €${finalTotal.toFixed(2)}
        </p>

        <h3 style="margin-top: 24px; color: #a8bba2;">Shipping information:</h3>
        <p style="font-size: 16px;">
          Address: ${address || ''}<br>
          Phone: ${phone || ''}
        </p>

        <p style="font-size: 16px; margin-top: 24px; font-weight: bold; color: #f9e6d8;">
          Thank you for choosing B'ooléan Cosmetics! We hope you enjoy your purchase. If you have any questions, feel free to contact us. 
        </p>
      </div>  
    `;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Order Confirmation ${orderNumber}`,
            html: htmlMessage,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Errore invio email:', err);
                return res.status(500).json({ error: 'Errore invio email' });
            }
            console.log('Email inviata:', info.response);
            return res.status(200).json({ message: 'Email sent successfully' });
        });
    });
}

module.exports = { sendOrderConfirmationEmail };
