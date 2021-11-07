// /verifier si c'est l'user ou un admin

const jwt = require('jsonwebtoken');


exports.user = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.TOKEN);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId != userId ) {
    console.log(req.body.userId);
    console.log(userId);
    
    console.log('user n est pas connecter');
    
    res.status(401).json({ error: error | 'Requete  !'});
    
  } else {
    
    // console.log(file.mimetype)
    console.log('user authentifier');
    next();
    }
}

exports.admin = (req, res, next) =>{
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token,process.env.TOKEN);
  const role = decodedToken.role;

  if (role !== 'admin') {
    console.log('user n est pas admin');
    res.status(401).json({ error: error | 'not admin'});
    } else {
    console.log('admin authentifier');

      next();
    }
}