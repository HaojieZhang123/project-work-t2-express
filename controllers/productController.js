const connection = require('../data/db')

const index = (req, res) => {
    res.send('index')
}

const show = (req, res) => {
    res.send('show')
}

// store
app.post(function (req, res) {
    res.send();
});

// update
app.post(function (req, res) {
    res.send()
})

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}
