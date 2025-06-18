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
    const { name, surname, email, phone, address, promo_code_id, shipping_cost, products } = req.body
    // products è un array di oggetti: [{ product_id, quantity }]

    const sqlOrder = 'INSERT INTO orders (name, surname, email, phone, address, promo_code_id, shipping_cost) VALUES (?, ?, ?, ?, ?, ?, ?)'

    connection.query(sqlOrder, [name, surname, email, phone, address, promo_code_id, shipping_cost], (err, result) => {
        if (err) { return next('Errore di caricamento ordine') }

        const orderId = result.insertId; // Ottieni l'ID dell'ordine appena inserito

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(201).json({
                status: 'success',
                message: 'Ordine inserito senza prodotti',
                order_id: orderId
            })
        }

        const values = products.map(p => {
            const obj = {
                product_id: p.product_id,   
                quantity: p.quantity || 1,
                order_id: orderId
            }
            return obj;
        });

        
        const sqlProduct = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)';

        values.forEach((p, idx) => {
        
            connection.query(sqlProduct, [orderId, p.product_id, p.quantity], (err2) => {
            let hasError = false;
            if (hasError) return;
            if (err2) {
                hasError = true;
                return next('Errore di caricamento prodotti ordine');
            }
            if (idx === (products.length - 1)) {
                res.status(201).json({
                status: 'success',
                message: 'Ordine e prodotti inseriti con successo',
                order_id: orderId
                });
            }
            });
        });
    })
}

module.exports = { store , storeOrder }