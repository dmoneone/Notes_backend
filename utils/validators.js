const {body, validationResult} = require('express-validator/check')

module.exports = [
    body('title', 'title: (length: min: 2, max: 20)')
        .isLength({ min: 2, max: 20 }),
    body('descr', 'descr: (length: min: 2, max: 300)')
        .isLength({ min: 2, max: 300 })
]