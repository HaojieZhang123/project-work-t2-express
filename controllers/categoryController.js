const connection = require('../data/db');

// GET /categories - Elenco di tutte le categorie
const index = (req, res, next) => {
    const query = "SELECT * FROM category";

    connection.query(query, (err, results) => {
        if (err) return next(err);

        res.json(results); // restutisce tutte le categorie
    });
};

module.exports = {
    index
};
