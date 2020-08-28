const {body, validationResult} = require('express-validator/check')

module.exports = [
    body('title', 'title should be is alphanumeric (length: min: 2, max: 20)')
        .isLength({ min: 2, max: 20 })
        .isAlphanumeric(),
    body('descr', 'descr: (length: min: 2, max: 200)')
        .isLength({ min: 2, max: 200 })
]