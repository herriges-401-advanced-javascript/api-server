'use strict';

const ProductSchema = require('./products.schema.js');
const Model = require('../mongo.js');

class Product extends Model {
    constructor() {
        super(ProductSchema);
    }
}

module.exports = new Product();
