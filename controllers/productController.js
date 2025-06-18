const connection = require('../data/db')

const index = (req, res, next) => {
    connection.query("SELECT * FROM products", (err, productResult) => {
        if (err) return next(err); // passo l’errore al middleware

        const products = productResult.map(product => {
            return product;
        })
        res.json(products);
    });
};

// show
const show = (req, res) => {
    const id = req.params.id;

    // query
    const productQuery = `SELECT * FROM products WHERE id = ${id}`;

    // execute query
    connection.query(productQuery, (error, results) => {
        // error
        if (error) throw error;

        // not found
        if (results.length === 0) {
            res.status(404).json({
                error: '404',
                message: 'Product not found'
            });
        }
        else {
            res.send(results[0]);
        }
    });
}

// Best sellers: primi 5 prodotti ordinati per sold
const bestSellers = (req, res, next) => {
    const query = `
        SELECT * FROM products ORDER BY sold DESC LIMIT 5
    `;

    connection.query(query, (error, results) => {
        if (error) return next(err);

        res.json(results);
    });
};


// Latest products: primi 5 prodotti ordinati per created_at
const latestProducts = (req, res, next) => {
    const query = `
        SELECT * FROM products ORDER BY added_date DESC LIMIT 5
    `;

    connection.query(query, (error, results) => {
        if (error) return next(err);

        res.json(results);
    });
};

// store
const store = (req, res) => {
    res.send('store');
};

// update
const update = (req, res) => {
    res.send('update');
}

// modify
const modify = (req, res) => {
    res.send('modify')
}

// destroy
const destroy = (req, res) => {
    res.send('destroy')
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy,
    bestSellers,
    latestProducts
}