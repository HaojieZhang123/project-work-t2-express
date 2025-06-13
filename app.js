const express = require('express');

// inizializzo express
const app = express();

// definisco la porta
const port = process.env.SERVER_PORT || 3000;

// definisco il file router
const productRouter = require('./routers/productRouter')
const brandRouter = require('./routers/brandRouter')
const categoryRouter = require('./routers/categoryRouter')
const promoCodeRouter = require('./routers/promoCodeRouter')
const orderRouter = require('./routers/orderRouter');
const orderProductRouter = require('./routers/orderProductRouter');

// middlewares
const errorsHandler = require('./middlewares/errorsHandler');
const notFound = require('./middlewares/notFound');

//inizializzo cors
const cors = require('cors');

app.use(cors({
    origin: process.env.FE_APP
}))

// importo gli asset statici 
app.use(express.static('public'));

// definisco il formato dei response
app.use(express.json());

// definizione della rotta base
app.get('/', (req, res) => {
    res.send('Store API entry point');
})

// inizializzo le rotte
app.use('/api/products', productRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/brands', brandRouter)
app.use('/api/promo_codes', promoCodeRouter)
app.use('/api/orders', orderRouter);
app.use('/api/order_product', orderProductRouter);

// errors
app.use(errorsHandler);
app.use(notFound);

//server in ascolto
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
});