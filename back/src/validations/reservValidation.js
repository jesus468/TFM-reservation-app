const {body , param} = require('express-validator');

const createReserveValidation = [
    body('name')
        .notEmpty()
        .withMessage('ExpVal: Name cant be empty')
        .matches(/[a-zA-Z]/)
        .withMessage('ExpVal: Name must be string'),
    body('diners')
        .notEmpty()
        .withMessage('ExpVal: diners cant be empty')
        .isInt({min : 1})
        .withMessage('ExpVal: diners muts be a number'),
    body('deposit')
        .isInt({min:0})
        .withMessage('ExpVal: deposit muts be a number'),
    body('plates')
        .isArray()
        .withMessage('ExpVal: plates must be an array'),
    body('date')
        .notEmpty()
        .withMessage('ExpVal: date cant be empty')
        .isISO8601()
        .withMessage('ExpVal: date must be a Date')
        .custom(value => {
            const date = new Date(value);
            const nextDay = new Date()

            nextDay.setDate(nextDay.getDate()+1);

            if(date<nextDay){
                throw new Error('ExpVal: date cant be before today')
            }

            return true;
        })
]

const deleteReserveValidation = [
    param('id')
        .notEmpty()
        .withMessage('ExpVal: id cant be empty')

]
module.exports = {
    createReserveValidation,
    deleteReserveValidation
}