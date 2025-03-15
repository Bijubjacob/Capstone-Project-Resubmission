// Middleware to check if the user is an admin
export default function (req, res, next) {
    // Check if the user object exists
    if (!req.user || !req.user.role) {
        return res.status(400).json({ errors: [{ msg: 'User not authenticated or role not assigned' }] });
    }
    
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ errors: [{ msg: 'Access denied, admin rights required' }] });
    }
    next();
}
