const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing', success: false });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is not valid', success: false });
    }

    try {
        const decode = jwt.verify(token, 'sourabh'); // Consider using an environment variable for your secret
        req.id = decode.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token', success: false });
    }
}
