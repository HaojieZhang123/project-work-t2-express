const connection = require('../data/db');

// GET /promocodes - Recupera tutti i codici promozionali
const index = (req, res, next) => {
    const query = "SELECT * FROM promo_codes";

    connection.query(query, (err, results) => {
        if (err) return next(err);

        res.json(results); // restituisce tutti i codici promo
    });
};


// show
const show = (req, res, next) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM promo_codes WHERE id = ?';

    connection.query(sql, [id], (error, results) => {
        if (error) return next(error);

        if (results.length === 0) {
            res.status(404).json({
                error: '404',
                message: 'Promo code not found'
            });
        } else {
            res.json(results[0]);
        }
    });
}

module.exports = {
    index,
    show
};
