const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    // Verify if cookies are present in the request
    const { cookies, headers } = req;
    if (!cookies || !cookies.access_token) {
      return res
        .status(401)
        .json({ msg: 'Missing or expired cookie, you must login again' });
    }

    // TOKEN_SECRET could be generated with an algorithm like const{ secret, algorithm } = require('./config');
    const token = cookies.access_token;
    // const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    req.auth = { userId };
    if (req.body.id && req.body.id !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: `Invalid request, check token! Id no.${req.params.id}`,
    });
  }
};

exports.authAdmin = (req, res, next) => {
  try {
    const { cookies, headers } = req;
    if (!cookies || !cookies.access_token) {
      return res
        .status(401)
        .json({ msg: 'Missing or expired cookie, you must login again' });
    }

    const token = cookies.access_token;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = decodedToken.role;

    if (role !== 'admin') {
      throw 'NOT AN ADMIN';
    } else {
      next();
    }
  } catch {
    return res.status(401).json({ message: 'Token not available' });
  }
};
