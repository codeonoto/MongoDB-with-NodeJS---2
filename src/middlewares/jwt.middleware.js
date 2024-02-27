import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
  // 1. Read the token.
  const token = req.headers['authorization'];

  // 2. if no token, return the error.
  if (!token) {
    return res.status(401).send('UnAuthorized');
  }

  // 3. check if token is valid.
  try {
    const payload = jwt.verify(token, 'rW3ubt5ww6a8frcfxQLEAnvi1NhBWtd8');
    req.userID = payload.userID;
    console.log(payload);
  } catch (error) {
    // 4. return error.
    return res.status(401).send('Unauthorized');
  }

  // 5. call next middleware
  next();
};

export default jwtAuth;
 