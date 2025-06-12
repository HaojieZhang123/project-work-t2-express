//importo mysql2
const mysql = require('mysql2');

//creo la connessione al db
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

//effettuo la connessione
connection.connect((err) => {
    if (err) {
        console.log("errore to connect to my sql:" + err)
    }
    else {
        console.log("connected to my sql")
    }
})

//esporto la variabile connection
module.exports = connection