const connection = require('../data/db');

// GET /categories - Elenco di tutte le categorie
const index = (req, res, next) => {
    const query = "SELECT * FROM product_category";

    connection.query(query, (err, results) => {
        if (err) throw err; // passo l’errore al middleware

        res.json(results); // restutisce tutte le categorie
    });
};

module.exports = {
    index
};