const connection = require('../data/db')

const store = (req, res, next) => {
    const { name, surname, email, phone, address, promo_code_id, shipping_cost } = req.body

    const sql = 'INSERT INTO orders (name, surname, email, phone, address, promo_code_id, shipping_cost) VALUES (?, ?, ?, ?, ?, ?, ?)'

    connection.query(sql, [name, surname, email, phone, address, promo_code_id, shipping_cost], (err, result) => {
        if (err) { return next('Errore di caricamento') }

        res.status(201).json({
            status: 'success',
            message: 'Ordine inserito con successo'
        })
    })
}

// Inserisce un nuovo ordine e i suoi prodotti
const storeOrder = (req, res, next) => {
    const {
        name,
        surname,
        email,
        phone,
        address,
        promoCodeId,
        shippingCost,
        products
    } = req.body;

    const orderQuery = `
        INSERT INTO orders (name, surname, email, phone, address, promo_code_id, shipping_cost)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        orderQuery,
        [name, surname, email, phone, address, promoCodeId, shippingCost],
        (err, result) => {
            if (err) {
                return next('Errore di caricamento ordine');
            }

            const orderId = result.insertId;

            if (!Array.isArray(products) || products.length === 0) {
                return res.status(201).json({
                    status: 'success',
                    message: 'Ordine inserito senza prodotti',
                    orderId
                });
            }

            const productValues = products.map(product => ({
                orderId,
                productId: product.product_id,
                quantity: product.quantity || 1
            }));

            const productQuery = `
                INSERT INTO order_products (order_id, product_id, quantity)
                VALUES (?, ?, ?)
            `;

            productValues.forEach(product => {
                connection.query(
                    productQuery,
                    [product.orderId, product.productId, product.quantity],
                    (err2) => {
                        if (err2) {
                            return next(
                                'Errore di caricamento prodotti ordine'
                            );
                        }
                    }
                );
            });

            res.status(201).json({
                status: 'success',
                message: 'Ordine e prodotti inseriti con successo',
                orderId
            });
        }
    );
};

module.exports = { store, storeOrder }