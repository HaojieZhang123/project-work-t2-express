const connection = require('../data/db')

const index = (req, res) => {
    res.send('index')
}

const show = (req, res) => {
    res.send('show')
}


module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}