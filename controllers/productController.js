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
    res.send('show')
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