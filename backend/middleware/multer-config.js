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
    const nameSplit = file.originalname.split('.')[0];
    const name = nameSplit.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];

    callback(null, name + Date.now() + '.' + extension);
  },
});

module.exports = multer({ storage }).single('avatar');
