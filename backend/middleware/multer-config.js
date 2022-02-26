const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  // 'image/heic': 'heic',
  'image/gif': 'gif',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // null as first argument means no error
    if (file.fieldname === 'image') {
      callback(null, './uploads/images');
    } else if (file.fieldname === 'avatar') {
      callback(null, './uploads/avatars');
    }
  },
  filename: (req, file, callback) => {
    const nameSplit = file.originalname.split('.')[0];
    const name = nameSplit.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];

    callback(null, name + Date.now() + '.' + extension);
  },
});

module.exports = multer({ storage }).fields([
  {
    name: 'avatar',
    maxCount: 1,
  },
  {
    name: 'image',
    maxCount: 5,
  },
]);

// image = post.image, maximum 5 uploads
// module.exports = multer({ storage }).array('image', 5);
