export const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ error: 'You must be Logged In' });
    }
    req.user = { role: 'ADMIN' };
    next(); 
} 
/* export const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ error: 'You must be Logged In' });
    }
    
    const role = req.cookies.role; 
    
    if (!role) {
        return res.status(401).json({ error: 'Role not found in cookies' });
    }
  
    req.user = { role };
    next(); 
} */