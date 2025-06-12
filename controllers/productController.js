const connection = require('../data/db')

// index
const index = (req, res) => {
    res.send('index')
}

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
    destroy
}