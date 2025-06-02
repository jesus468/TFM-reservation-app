const errorHandler = (error, req , res , next) => {
    const code = error.status || 500;

    console.log('errorHandler : ', error);

    res.status(code).json({
        success : 'NOK',
        code: error.stack,
        secondCode : error.statusCustom,
        data: error.data ,
        message : error.message || 'Server internal error',
        error : error.errorList,
        status : error.status
    })
}

module.exports = errorHandler;