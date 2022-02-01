const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
  'image/gif': 'gif',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // null as first argument means no error
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    // enlever date pour pouvoir comparer
    callback(null, name);
    // callback(null, name + Date.now() + '.' + extension);
  },
});

// 'avatar' is the name of our file input field in the HTML form
module.exports = multer({ storage }).single('avatar');
