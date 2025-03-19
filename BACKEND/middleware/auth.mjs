import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'No Token, Auth Denied' }] });
    }

    try {
        // Verify token with secret key
        const decoded = jwt.verify(token, process.env.jwtSecret);

        // Ensure the decoded token has the user
        if (!decoded || !decoded.user) {
            return res.status(401).json({ errors: [{ msg: 'Invalid token structure' }] });
        }

        // Attach user to the request
        req.user = decoded.user;

        // Call next middleware
        next();
    } catch (err) {
        console.error(err);

        // Handle invalid token
        return res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
    }
};
