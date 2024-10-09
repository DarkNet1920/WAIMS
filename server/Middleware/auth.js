const jwt = require('jsonwebtoken');

// Middleware to authenticate user using JWT
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'yourSecretKey'); // Replace 'yourSecretKey' with your JWT secret
        req.user = decoded; // Assuming JWT stores user information (e.g., user ID)
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateUser;