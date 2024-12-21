import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified; // Add user details from the token to the request
    localStorage.setItem('user', JSON.stringify(verified));
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
