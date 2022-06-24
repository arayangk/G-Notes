const jwt = require('jsonwebtoken');



  module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        console.log(authHeader)
        if (!authHeader) return res.status(403).send("Access denied.");
          
        const token = authHeader.split(' ')[1]
          console.log(token)
          const userData = jwt.verify(token, process.env.SECRET_KEY)
          req.user = userData
          console.log(userData)
        
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};