const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        if(!token)
            return res.status(401).json({message: "Access denied"});
    
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userID = decoded.userID;
        next();
    } catch(err){
        console.log("Auth Middleware Error");
        console.log(err);
        return res.status(500).json({message: "Internal Server Error. Token is not valid."});
    }
}

module.exports = authMiddleware;