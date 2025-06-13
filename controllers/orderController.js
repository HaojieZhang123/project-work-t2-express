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

module.exports = { storeOrder }