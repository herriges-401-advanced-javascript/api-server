// ========================================
// ========deprecated/not in use===========
// ========================================

'use strict';

const express = require('express');

const router = express.Router();

const product = require('../lib/models/products/products.collection.js');

router.post('/products', (req, res, next) => {
    product.create(req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
    
});

router.get('/products', (req, res, next) => {
    product.get()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

router.get('/products/:id', (req, res, next) => {
    product.get(req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

router.put('/products/:id', (req, res, next) => {
    product.update(req.params.id, req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});   

router.delete('/products/:id', (req, res, next) => {
    product.delete(req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);                                                    
});                                                                          


module.exports = router;