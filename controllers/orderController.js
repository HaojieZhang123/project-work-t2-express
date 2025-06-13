const connection = require('../data/db')

const storeOrder = (req, res, next) => {
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

const storeOrder_products = (req, res, next) => {
    // const { id } = req.params

    const { product_id, quantity } = req.body

    const sql = 'INSERT INTO order_product (product_id, quantity) VALUES ( ?, ?)'

    connection.query(sql, [product_id, quantity], (err, result) => {
        if (err) { return next('Errore di caricamento') }

        res.status(201).json({
            status: 'success',
            message: 'product_id associato con successo all\'order_id'
        })
    })
}

module.exports = { storeOrder, storeOrder_products }