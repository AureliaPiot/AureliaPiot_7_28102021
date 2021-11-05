// action d'inscription + connexion [+token identification]

const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
  
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.TOKEN);
    const userId = decodedToken.userId;


    if (req.body.userId && req.body.userId !== userId) {
    console.log('erreur');


      throw 'Invalid user ID';

    } else {

      next();
    }
  } catch(error) {
    res.status(401).json({ error: error | 'Requete non authentifiée !'});
    console.log('User non authentifiée');
  }
  

};
// try and catch, car plusieurs elements peuvent posé probleme qui seront géré avec try/catch
// catch renvoie juste une erreur 401 qui correspond a un probleme d'authentifications