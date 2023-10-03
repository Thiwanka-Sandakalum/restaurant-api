// Express app setup
const express = require('express');
const app = express();
const menu_router = require('./routes/menuRoutes');
const order_router = require('./routes/orderRoutes');
app.use(express.json());
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome")
    console.log("Welcome")
})

// routers 
// app.use('/api/order', order_router);
// app.use('/api/menu', menu_router);


module.exports = app;