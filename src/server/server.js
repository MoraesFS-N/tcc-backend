require('dotenv').config();


const express =  require('express');
const routes = require('../routes/routes');
const app =  express();
const port = 3333;


const connectToDatabase =  require('./connection');
connectToDatabase();

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Backend is running at Port: ${port}`);
});