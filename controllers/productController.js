const connection = require('../data/db')

const index = (req, res, next) => {
    // query
    const sql = 'SELECT p.id AS id, p.slug, p.product_name, p.price, p.description, p.added_date, p.sold, p.discount, p.image, b.brand_name, c.category_name FROM products p LEFT JOIN brand_name b ON p.brand_id = b.id LEFT JOIN product_category pc ON p.id = pc.product_id LEFT JOIN category c ON pc.category_id = c.id';

    connection.query(sql, (err, productResult) => {
        if (err) return next(err); // passo l’errore al middleware

        // const products = productResult.map(product => {
        //     return product;
        // })
        res.json(productResult);
    });
};

// show
const show = (req, res) => {
    // const id = req.params.id;
    // recupero lo slug
    const slug = req.params.slug;

    // query
    const sql = 'SELECT p.id AS id, p.product_name, p.slug, p.price, p.description, p.added_date, p.sold, p.discount, p.image, b.brand_name, c.category_name FROM products p LEFT JOIN brand_name b ON p.brand_id = b.id LEFT JOIN product_category pc ON p.id = pc.product_id LEFT JOIN category c ON pc.category_id = c.id WHERE p.slug = ?';

    // execute query
    connection.query(sql, [slug], (error, results) => {
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
            res.json(results[0]);
        }
    });
}

// Best sellers: primi 5 prodotti ordinati per sold
const bestSellers = (req, res, next) => {
    const query = `
        SELECT p.id AS id, p.slug, p.product_name, p.price, p.description, p.added_date, p.sold, p.discount, p.image, b.brand_name, c.category_name FROM products p LEFT JOIN brand_name b ON p.brand_id = b.id LEFT JOIN product_category pc ON p.id = pc.product_id LEFT JOIN category c ON pc.category_id = c.id ORDER BY sold DESC LIMIT 5
    `;

    connection.query(query, (error, results) => {
        if (error) return next(err);

        res.json(results);
    });
};


// Latest products: primi 5 prodotti ordinati per created_at
const latestProducts = (req, res, next) => {
    const query = `
        SELECT p.id AS id, p.slug, p.product_name, p.price, p.description, p.added_date, p.sold, p.discount, p.image, b.brand_name, c.category_name FROM products p LEFT JOIN brand_name b ON p.brand_id = b.id LEFT JOIN product_category pc ON p.id = pc.product_id LEFT JOIN category c ON pc.category_id = c.id ORDER BY added_date DESC LIMIT 5
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