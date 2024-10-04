import jwt from 'jsonwebtoken'

// export const verifyToken = (req, res, next) => {
  // const bearerToken = req.headers['authorization'];
  // const loginToken = bearerToken && bearerToken.split(' ')[1];
  // if (!loginToken){
    // return res.status(401).json({success: false, message: "Not authorized to access"});
  // }
  // jwt.verify(loginToken, process.env.SECRET_KEY, (err, user) => {
    // if (err){
      // res.json({success: false, message: "Failed to Authenticate"});
    // }
    // else{
      // req.user = user;
      // next();
    // }
  // })
//}

export const verifyToken = (req, res, next) => {
  const authCookie = req.cookies['auth'];
  if (!authCookie){
    return res.status(401).json({success: false, message: "User Authentication Failed"});
  } 
  jwt.verify(authCookie, process.env.SECRET_KEY, (err, user) => {
    if (err){
      res.json({success: false, message: "User Authentication Failed"});
    }
    else{
      req.user = user;
      next();
    }
  })
}