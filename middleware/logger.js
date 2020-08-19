'use strict';

module.exports = (req, res, next) => {
    console.log(`
    Path: ${req.url}
    Method: ${req.method}
    Time Stamp: ${req.requestTime}   
    `);
    next();
}