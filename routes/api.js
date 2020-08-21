'use strict';

const express = require('express');
const router = express.Router();


const category = require('../lib/models/categories/categories.collection.js');
const product = require('../lib/models/products/products.collection.js');

function getModel(req, res, next) {
    let model = req.params.model;

    switch(model) {
        case 'categories':
            req.model = category;
            next();
            return;
        case 'product':
            req.model = product;
            next();
            return;
            default:
                next('Bad model');
                return;
    }
}


router.param('model', getModel);

router.post('/:model', handlePost);
router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.put('/:model/:id', handlePut);
router.delete('/:model/:id', handleDelete);

function handlePost(req, res, next) {
    req.model.create(req.body)
        .then(data => {
            res.status(200).json(data);
        }).catch(next);
}
        
function handleGetAll(req, res, next) {
    req.model.get()
        .then(data => {
            res.status(200).json(data)
        }).catch(next);
}

function handleGetOne(req, res, next) {
    req.model.get(req.params.id)
        .then(data => {
            res.status(200).json(data);
        }).catch(next);
}

function handlePut(req, res, next) {
    req.model.update(req.params.id, req.body)
        .then(data => {
            res.status(200).json(data);
        }).catch(next);
}

function handleDelete(req, res, next) {
    req.model.delete(req.params.id)
        .then(data => {
            res.status(200).json(data);
        }).catch(next)
}
// router.post('/categories', (req, res, next) => {
//     category.create(req.body)
//     .then(data => {
//         res.status(200).json(data);
//     })
//     .catch(next);
// });

// router.post('/products', (req, res, next) => {
//     product.create(req.body)
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch(next);
    
// });

// router.get('/categories', (req, res, next) => {
//     category.get()
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch(next);
// });

// router.get('/categories/:id', (req, res, next) => {
//     category.get(req.params.id)
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch(next);
// });

// router.put('/categories/:id', (req, res, next) => {
//     category.update(req.params.id, req.body)
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch(next);

// });

// router.delete('/categories/:id', (req, res, next) => {
//     category.delete(req.params.id)
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch(next);
    
// });                                                                             

// router.get('/products', (req, res, next) => {
//     product.get()
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch(next);
// });

// router.get('/products/:id', (req, res, next) => {
//     product.get(req.params.id)
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch(next);
// });

// router.put('/products/:id', (req, res, next) => {
//     product.update(req.params.id, req.body)
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch(next);
// });   

// router.delete('/products/:id', (req, res, next) => {
//     product.delete(req.params.id)
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch(next);                                                    
// });                              
module.exports = router;
