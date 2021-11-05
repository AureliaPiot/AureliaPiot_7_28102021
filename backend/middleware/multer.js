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
      const name = Date.now();
    //   const name = JSON.parse(req.body.sauce).name.replaceAll(regexInput, "-");
      const extension = MIME_TYPES[file.mimetype];
      callback(null,name +"_"+ Date.now() + '.' + extension);
    }
  });