import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const authCookie = req.cookies['auth'];
  if (!authCookie){
    return res.status(401).json({success: false, message: "User Authentication Failed"});
  } 
  jwt.verify(authCookie, process.env.SECRET_KEY, (err, user) => {
    if (err){
      res.status(401).json({success: false, message: "User Authentication Failed"});
    }
    else{
      req.user = user;
      next();
    }
  })
}