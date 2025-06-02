const {validationResult} = require('express-validator');

const handleValidation = (req, res, next) => {

    //console.log('/-------- entro al validation result ---------');
    const error = validationResult(req);
    if(error.errors.length>0){
        return res.status(400).json({success: 'NOK', errorList: error.array()});
    }

    next();
}

module.exports = handleValidation;