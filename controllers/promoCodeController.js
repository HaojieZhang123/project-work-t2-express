const connection = require('../data/db');

// GET /promocodes - Recupera tutti i codici promozionali
const index = (req, res, next) => {
    const query = "SELECT * FROM promo_codes";

    connection.query(query, (err, results) => {
        if (err) return next(err);

        res.json(results); // restituisce tutti i codici promo
    });
};

module.exports = {
    index
};
