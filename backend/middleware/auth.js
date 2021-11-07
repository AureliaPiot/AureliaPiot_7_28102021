// /verifier si c'est l'user ou un admin

const jwt = require('jsonwebtoken');

exports.connect = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);


  if(token !== null) {
  next();
  console.log('utilisateur connecté');
} else {
  console.log('utilisateur non connecté');
  res.status(401).json({ error: error | 'Requete  !'});
  }
}


exports.user = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.TOKEN);
    const role = decodedToken.role;

    console.log(role);

    if(role === 'user'|| role === 'admin') {
    next();
    console.log('action autorisé');
  } else {
    console.log('action non autorisé');
    res.status(401).json({ message:"action non autorisé"});
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