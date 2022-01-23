const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const bikes = require('./routers/bikes');
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', bikes);

