const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

class AuthMiddleWare {
    // Check Token
    async verifyToken(req, res, next) {
        const token = req.headers.authorization;

        // Check have token
        if (!token)
            return res.status(401).send({
                message: 'You are not authenticated!',
            });

        // Check Token
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.JWTPRIVATEKEY, (err, data) => {
            // Invalid token
            if (err)
                return res.status(403).send({
                    message: 'Your token is not valid!',
                });
            // Valid token
            req.user = data;
            next();
        });
    }

    // Veryfy but can access
    async verifyCanAccessWithoutToken(req, res, next) {
        const token = req.headers.authorization;

        // Check have token
        if (!token) {
            next();
            return;
        }

        // Check Token
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.JWTPRIVATEKEY, (err, data) => {
            // Invalid token
            if (err)
                return res.status(403).send({
                    message: 'Your token is not valid!',
                });

            // Valid token
            req.user = data;
            next();
        });
    }

    // Check admintrator
    async isAdmin(req, res, next) {
        if (!req.user.isAdmin)
            return res.status(403).send({
                message:
                    'Access is denied. You do not have access to this content',
            });
        next();
    }
}

module.exports = new AuthMiddleWare();
