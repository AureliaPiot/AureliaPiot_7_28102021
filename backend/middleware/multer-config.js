const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif' :'gif'
  };
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, 'images');
      
    },
    filename: (req, file, callback) => {
      console.log('filename')


      const name = file.originalname.split(' ').join('_');
    //   const name = JSON.parse(req.body.post).name.replaceAll(regexInput, "-");
      const extension = MIME_TYPES[file.mimetype];
      callback(null,name+"_"+ Date.now() + '.' + extension);
    }
  });
  
module.exports = multer({storage: storage}).single('file');