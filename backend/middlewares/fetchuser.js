const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SECRET_KEY_JWT';

const fetchuser = (req, res, next) => {

    // Get user form jwt token and add it to the request object
    const token = req.header('auth-token')

    if (!token) {
        return res.status(401).send({ error: "Please authenticate with valid token." });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch {
        return res.status(401).send({ error: "Please authenticate with valid token." });
    }
}


module.exports = fetchuser;