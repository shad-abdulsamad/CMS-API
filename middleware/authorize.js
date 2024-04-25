export const authorize = (requiredRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        
        if (!requiredRoles.includes(userRole)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};
