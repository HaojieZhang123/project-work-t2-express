const connection = require('../data/db');

// GET /brands - Recupera tutti i brand
const index = (req, res, next) => {
    const query = "SELECT * FROM brand_name";

    connection.query(query, (err, results) => {
        if (err) return next(err);

        res.json(results); // restituisce tutti i brand
    });
};

module.exports = {
    index
};
