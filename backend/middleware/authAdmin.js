module.exports = (req, res, next) => {
  // Always pass it to the body otherwise it won't read...
  try {
    if (req.user.role !== 2 && req.user.role !== 'admin') {
      throw "You don't have the permission to perform this task.";
    } else {
      next();
    }
  } catch {
    console.log(req.user.role);
    res.status(401).json({
      error: `Invalid request, only Admin users can have access`,
    });
  }
};

// const jwt = require('express-jwt');

// module.exports = (req, res, next) => {
//   const { cookies } = req;
//   let roles = [];
//   // roles param can be a single role string (e.g. Role.User or 'User')
//   // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
//   if (typeof roles === 'string') {
//     roles = ['admin'];
//   }

//   const token = cookies.access_token;
//   // authenticate JWT token and attach user to request object (req.user)
//   const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
//   const userId = decodedToken.id;

//   // authorize based on user role

//   if (roles.length && !roles.includes(req.user.role)) {
//     // user's role is not authorized
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   // authentication and authorization successful
//   next();
// };
