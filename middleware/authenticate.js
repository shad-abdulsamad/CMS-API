import jwt from 'jsonwebtoken';
import  getUserRoleById  from "../helpers/getUserRoleById.js";

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    const secret = "jwtsecretkey";
    if (!token) {
        return res.status(401).json({ error: 'You must be Logged In' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        const userId = decoded.userId;

        const userRole = await getUserRoleById(userId);
      
        req.user = { role: userRole };
      
        next(); 
    } catch (error) {
        console.error("Error authenticating user:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
