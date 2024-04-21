export const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ error: 'You must be Logged In' });
    }
    req.user = { role: 'ADMIN' };
    next(); 
}