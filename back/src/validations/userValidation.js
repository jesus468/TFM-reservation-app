const {body, param} = require('express-validator');

const createUserValidation = [
    body('name')
        .notEmpty()
        .withMessage('ExpVal: Name cant be empty')
        .matches(/[a-zA-Z]/)
        .withMessage('ExpVal: Name must be string'),
    body('secondName')
        .notEmpty()
        .withMessage('ExpVal: SecondName cant be empty')
        .matches(/[a-zA-Z]/)
        .withMessage('ExpVal: SecondName must be string'),
    body('mobileNum')
        .notEmpty()
        .withMessage('ExpVal: MobileNum cant be empty')
        .isMobilePhone(['es-ES', 'en-GB', 'fr-FR'])
        .withMessage('ExpVal: MobileNum must be a valid mobile number'),
    body('email')
        .notEmpty()
        .withMessage('ExpVal: Email cant be empty')
        .isEmail()
        .withMessage('ExpVal: Email must be a valid email'),
    body('password')
        .notEmpty()
        .withMessage('ExpVal: Password cant be empty')
        .isString()
        .withMessage('ExpVal: Password must be a string')
        .isLength({ min: 8 })
        .withMessage('ExpVal: Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('ExpVal: Password must contain at least one number')
        .matches(/[a-zA-Z]/)
        .withMessage('ExpVal: Password must contain at least one letter')
        .matches(/[!@#$%^&*]/)
        .withMessage('ExpVal: Password must contain at least one special character'),
];

const loginValidation = [
    body('email')
        .notEmpty()
        .withMessage('ExpVal: Email cant be empty')
        .isEmail()
        .withMessage('ExpVal: Email must be a valid email'),
    body('password')
        .notEmpty()
        .withMessage('ExpVal: Password cant be empty')
        .isString()
        .withMessage('ExpVal: Password must be a string')
        .isLength({ min: 8 })
        .withMessage('ExpVal: Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('ExpVal: Password must contain at least one number')
        .matches(/[a-zA-Z]/)
        .withMessage('ExpVal: Password must contain at least one letter')
        .matches(/[!@#$%^&*]/)
        .withMessage('ExpVal: Password must contain at least one special character'),
]

const deleteUserValidation = [
    param('email')
        .notEmpty()
        .withMessage('ExpVal: Email cant be empty')
        .isEmail()
        .withMessage('ExpVal: Email must be a valid email')
]
//console.log('------------- entro al userVAlidatoin');

module.exports = {
    createUserValidation,
    loginValidation,
    deleteUserValidation
};