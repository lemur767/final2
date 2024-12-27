import jwt from 'jsonwebtoken';



const authMiddleware = (req, res, next) => {
  try{  
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // Unauthorized
  
    jwt.verify(token, process.env.JWT_SECRET, (user) => {
      req.user = user;
      next();
    });
  }catch(err){
    if (err) return res.sendStatus(403);
  }
  };
  

export default authMiddleware;
