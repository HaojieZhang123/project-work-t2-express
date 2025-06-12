const connection = require('../data/db')

// index
const index = (req, res) => {
    res.send('index')
}

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