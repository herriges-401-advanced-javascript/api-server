'use strict';

const express = require('express');
const { response } = require('express');
const app = express();
require('dotenv').config();
const timeStamp = require('../middleware/timestamp.js');
const logger = require('../middleware/logger.js');
const handlePageNotFound = require('../middleware/404.js');
const handleError = require('../middleware/500.js');

app.use(express.json());

app.use(timeStamp);

app.use(logger);

app.get('/fruit', (req, res) => {
    let output = {
        type: req.query.type || 'unknown',

    };

    res.status(200).json(output);
});

app.get('/fruit/:type', (req, res) => {
    let output = {
        type: req.params.type,
    };
    res.status(200).json(output);
});


let db = {
    products: [],
    categories: [],
}

app.post('/products', (req, res) => {
    let record = req.body;
    record.id = db.products.length + 1;
    db.products.push(record);
    res.json(record);
});

app.get('/products', (req, res) => {
    res.json(db.products);
});

app.get('/products/:id', (req, res) => {
    let id = req.params.id;
    let record = db.products.find((record) => { // loops through products database and finds the first instance 
        return record.id === parseInt(id);      // where id of the product matches the id entered in the get, returning that product
    });
    res.json(record);
});

app.put('/products/:id', (req, res) => {
    let idToUpdate = req.params.id;
    let {name, id, display_name, description, category} = req.body;
    let updatedRecord = {name, id, display_name, description, category};
    db.products = db.products.map((record) => {                             // create a new array by mapping through the db products array
        return record.id === parseInt(idToUpdate) ? updatedRecord : record; // new array will be the same as old array except   
    });                                                                     // where the id of a previous product in the db matches
    res.json(updatedRecord);                                                // the id taken in on the put request.
});                                                                         
app.delete('/products/:id', (req, res) => {
    let id = req.params.id;
    db.products = db.products.filter((record) => record.id !== parseInt(id)); // filter through the database, creating a new array of
    res.json({});                                                             // all of the items in the database except where the id taken  
});                                                                           // in by the delete request matches the id of an item in the database

app.post('/categories', (req, res) => {
    let record = req.body;
    record.id = db.categories.length + 1;
    db.categories.push(record);
    res.json(record);
});

app.get('/categories', (req, res) => {
    res.json(db.categories);
});

app.get('/categories/:id', (req, res) => {
    let id = req.params.id;
    let record = db.categories.find((record) => { // loops through products database and finds the first instance 
        return record.id === parseInt(id);        // where id of the product matches the id entered in the get, returning that product
    });
    res.json(record);
});

app.put('/categories/:id', (req, res) => {
    let idToUpdate = req.params.id;
    let {name, id, display_name, description} = req.body;
    let updatedRecord = {name, id, display_name, description};
    db.categories = db.categories.map((record) => {                         // create a new array by mapping through the db products array
        return record.id === parseInt(idToUpdate) ? updatedRecord : record; // new array will be the same as old array except   
    });                                                                     // where the id of a previous product in the db matches
    res.json(updatedRecord);                                                // the id taken in on the put request.
});

app.delete('/categories/:id', (req, res) => {
    let id = req.params.id;
    db.categories = db.categories.filter((record) => record.id !== parseInt(id)); // filter through the database, creating a new array of
    res.json({});                                                                 // all of the items in the database except where the id taken 
});                                                                               // in by the delete request matches the id of an item in the database

app.use('*', handlePageNotFound);
app.use(handleError);



module.exports = {
    server: app,
    start: port => {
        const PORT = port || process.env.PORT || 3002;
        app.listen(PORT, () => console.log(`Listening on ${PORT}`))
    }
}
