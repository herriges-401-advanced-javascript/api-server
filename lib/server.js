'use strict';

const express = require('express');

const app = express();
require('dotenv').config();
const cors = require('cors');

const timeStamp = require('../middleware/timestamp.js');
const logger = require('../middleware/logger.js');
const handlePageNotFound = require('../middleware/404.js');
const handleError = require('../middleware/500.js');
const catRoutes = require('../routes/categories.js');
const prodRoutes = require('../routes/products.js');

app.use(express.json());
app.use(cors());

app.use(timeStamp);
app.use(logger);

app.use(catRoutes);
app.use(prodRoutes);


app.use('*', handlePageNotFound);
app.use(handleError);



module.exports = {
    server: app,
    start: port => {
        const PORT = port || process.env.PORT || 3002;
        app.listen(PORT, () => console.log(`Listening on ${PORT}`))
    }
}
