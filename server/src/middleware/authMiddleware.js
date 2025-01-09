const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if(!token)
        return res.status(401).json({message: "Access denied"});

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userID = decoded.userID;
        next();
    } catch(err){
        return res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = authMiddleware;