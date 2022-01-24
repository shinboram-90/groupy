// exports.signup = (req, res, next) => {
//   // const cryptoEmail = crypt.MD5(req.body.email).toString();
//   bcrypt
//     .hash(req.body.password, 10)
//     .then((hash) => {
//       const user = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: hash,
//         admin: 0,
//       });
//       db.query('INSERT INTO user SET ?', user, (err, res, field) => {
//         if (err) {
//           console.log(err);
//           return res.status(400).json('erreur');
//         }
//         return res
//           .status(201)
//           .json({ message: 'Votre compte a bien été crée !' });
//       });
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

// exports.login = async (req, res, next) => {
//   try {
//     const cryptoEmail = req.body.email;
//     let status = '';
//     // console.table([req.body.email, req.body.password]);
//     if (cryptoEmail && req.body.password) {
//       db.query(
//         'SELECT * FROM user WHERE email= ?',
//         cryptoEmail,
//         (error, results, fields) => {
//           if (results.length > 0) {
//             //bcrypt va comparé le mot de passe que l'utilisateur va entrer avec ce qui est déja enregistrer avec compare
//             bcrypt
//               .compare(req.body.password, results[0].password)
//               .then((valid) => {
//                 //valid est un boolean qui est d'abord sur true
//                 //si c'est false il y a error..
//                 if (!valid) {
//                   res.status(401).json({ message: 'Mot de passe incorrect' });
//                 } else {
//                   //on décris le niveau d'acces du membre...
//                   if (results[0].admin === 1) {
//                     status = 'ADMINISTRATEUR';
//                   } else {
//                     status = 'MEMBRE';
//                   }
//                   //confirmation User connecté & son statut
//                   console.log(
//                     `${req.body.username}s'est connecté en tant que: ${status}`
//                   );

//                   res.status(200).json({
//                     userId: results[0].id,
//                     email: results[0].email,
//                     username: results[0].username,
//                     admin: results[0].admin,
//                     token: jwt.sign(
//                       {
//                         userId: results[0].id,
//                         username: results[0].username,
//                         admin: results[0].admin,
//                       },
//                       'RANDOM_TOKEN_SECRET',
//                       { expiresIn: '24h' }
//                     ),
//                   });
//                 }
//               });
//           } else {
//             res
//               .status(401)
//               .json({ message: 'Utilisateur ou mot de passe inconnu' });
//           }
//         }
//       );
//     } else {
//       res
//         .status(500)
//         .json({ message: 'Entrez votre email et votre mot de passe' });
//     }
//   } catch (err) {
//     console.error('Something went wrong');
//     console.error(err);
//   }
// };
// exports.signup = (req, res, next) => {
//   db.query(
//     `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
//       req.body.email
//     )});`,
//     (err, result) => {
//       if (result.length) {
//         return res.status(409).send({
//           msg: 'This user is already in use!',
//         });
//       } else {
//         // username is available
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             return res.status(500).send({
//               msg: err,
//             });
//           } else {
//             // has hashed pw => add to database
//             db.query(
//               `INSERT INTO users (name, email, password) VALUES ('${
//                 req.body.name
//               }', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
//               (err, result) => {
//                 if (err) {
//                   // throw err;
//                   return res.status(400).send({
//                     msg: err,
//                   });
//                 }
//                 return res.status(201).send({
//                   msg: 'The user has been registerd with us!',
//                 });
//               }
//             );
//           }
//         });
//       }
//     }
//   );
// };

// exports.login = (req, res, next) => {
//   db.query(
//     `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
//     (err, result) => {
//       // user does not exists
//       if (err) {
//         return res.status(400).send({
//           msg: err,
//         });
//       }
//       if (!result.length) {
//         return res.status(401).send({
//           msg: 'Email or password is incorrect!',
//         });
//       }
//       // check password
//       bcrypt.compare(
//         req.body.password,
//         result[0]['password'],
//         (bErr, bResult) => {
//           // wrong password
//           if (bErr) {
//             return res.status(401).send({
//               msg: 'Email or password is incorrect!',
//             });
//           }
//           if (bResult) {
//             const token = jwt.sign(
//               { id: result[0].id },
//               'the-super-strong-secrect',
//               { expiresIn: '1h' }
//             );
//             db.query(
//               `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
//             );
//             return res.status(200).send({
//               msg: 'Logged in!',
//               token,
//               user: result[0],
//             });
//           }
//           return res.status(401).send({
//             msg: 'Username or password is incorrect!',
//           });
//         }
//       );
//     }
//   );
// };

// (req, res, next) => {
//   db.query(
//     'SELECT * FROM users WHERE id = ?',
//     req.params.id,
//     (error, result) => {
//       if (error) {
//         return res.status(400).json({ error: "Can't find this user" });
//       }
//       return res.status(200).json(result);
//     }
//   );
// };

// router.post("/get-user", (req, res, next) => {
//   if (
//     !req.headers.authorization ||
//     !req.headers.authorization.startsWith("Bearer") ||
//     !req.headers.authorization.split(" ")[1]
//   ) {
//     return res.status(422).json({
//       message: "Please provide the token",
//     });
//   }

// exports.deleteUser = (req, res, next) => {
//   User.delete(req.params.id, (err, user) => {
//     if (err) res.send(err);
//     res.json({ error: false, message: 'User successfully deleted' });
//   });
// };

//   const theToken = req.headers.authorization.split(" ")[1];
//   const decoded = jwt.verify(theToken, "the-super-strong-secrect");
//   db.query(
//     "SELECT * FROM users where id=?",
//     decoded.id,
//     function (error, results, fields) {
//       if (error) throw error;
//       return res.send({
//         error: false,
//         data: results[0],
//         message: "Fetch Successfully.",
//       });
//     }
//   );
// });

// exports.getAllUsers = (req, res, next) => {
//   db.query('SELECT * FROM users ', (error, result) => {
//     if (error) {
//       return res
//         .status(400)
//         .json({ error: "impossible d'afficher les listes des membres" });
//     }
//     return res.status(200).json(result);
//   });
// };
