const connection = require('../data/db')

const store = (req, res, next) => {
    const { order_id, product_id, quantity } = req.body

    console.log(req.body)

    const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)'

    connection.query(sql, [order_id, product_id, quantity], (err, result) => {
        if (err) { return next('Errore di caricamento') }

        res.status(201).json({
            status: 'success',
            message: 'product_id associato con successo all\'order_id'
        })
    })
}

module.exports = { store }