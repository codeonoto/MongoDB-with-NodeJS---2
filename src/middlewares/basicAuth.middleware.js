import UserModel from '../features/user/user.model.js';

const basicAuthorizer = (req, res, next) => {
  // 1. Check if authorization header is empty.

  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send('No Authorization Details Found');
  }
  console.log(authHeader);

  // 2. Extract Credentials. [Basic qwerrty2131243adfafsf]
  const base64Credentials = authHeader.replace('Basic', '');
  console.log(base64Credentials);

  // 3. deCode credentials.
  const decodedCreds = Buffer.from(base64Credentials, 'base64').toString(
    'utf8'
  );
  console.log(decodedCreds); // [username:password]
 
  const creds = decodedCreds.split(':');

  const user = UserModel.getAll().find(
    (u) => u.email == creds[0] && u.password == creds[1]
  );

  if (user) {
    next();
  } else {
    return res.status(401).send('Incorrect Credentials');
  }
};

export default basicAuthorizer;
