const JWT_Pass = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.json({
            message: "Not a valid token, please sign in again"
        })
    }
    console.log("Hello there"); 
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_Pass);
        console.log(decoded); 

        req.userId = decoded.userId;
        console.log(req.userId); 

        next();
    }
    catch (err) {
        console.log(err);
        res.json({
            message: "Token verification failed"
        })
    }
};
module.exports = {
    authMiddleware
}