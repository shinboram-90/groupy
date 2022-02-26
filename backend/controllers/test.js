// exports.createPost = async (req, res, next) => {
//   let image = [];
//   if (req.files) {
//     const imageUrl = `${req.protocol}://${req.get('host')}`;

//     let newFiles = Array(req.files);
//     for (let i = 0; i < newFiles; i++)
//       // Array(req.files).map((f) => {
//       //   image.push(`${imageUrl}/images/${f.image[i].filename}`);
//       //   i++;
//       // });
//       image += `${imageUrl}/images/${newFiles[i].filename}`;
//     console.log(image);
//   }

//   try {
//     const post = await new Post({
//       user_id: req.body.user_id,
//       title: req.body.title,
//       content: req.body.content,
//       status: 'published',
//       image: image,
//     });

//     const postCreated = await Post.create(post);
//     if (postCreated) {
//       res.status(201).json({ newPost: post });
//     } else {
//       res.status(401).json({ error: 'Query not completed' });
//     }
//   } catch (e) {
//     res.status(404).json({ error: 'Marked fields cannot be empty' });
//   }
// };
