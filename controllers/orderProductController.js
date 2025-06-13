const connection = require('../data/db')

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

module.exports = { storeOrder_products }