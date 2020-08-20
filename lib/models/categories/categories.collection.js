'use strict';

const CategorySchema = require('./categories.schema.js');
const Model = require('../mongo.js');

class Category extends Model {
    constructor() {
        super(CategorySchema);
    }
}

module.exports = new Category();
