const jwt = require('jsonwebtoken');

const authValidation = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message: `There's no token`})
        }

        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
        console.log('decoded del authvalidation: ', decoded);

        req.userId = decoded.userId;
        req.role = decoded.role;
        req.name = decoded.name;

        next()
    } catch (error) {
        console.log('there was an error in authValidation :', error);
        if(error.name === 'tokenExpiredError'){
            return res.status(401).json({message: 'Expired token'})
        }
        res.status(401).json({message: 'Invalid token'})

    }finally{
        console.log('authValidation finalized');
    }
}

module.exports = authValidation;