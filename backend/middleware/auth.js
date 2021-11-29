// /verifier si c'est l'user ou un admin
const db =require("../models")
const Users = db.users;
const Posts= db.posts;
const Coms= db.coms;


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
    const userId = decodedToken.userId;

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
// ----------------------------------------------------------------------------------------

exports.action = (req, res, next) =>{
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token,process.env.TOKEN);
  const role = decodedToken.role;
  const userId = decodedToken.userId;
  console.log('----------------------------------------------');


  console.log("userId  "+userId);
  console.log("role  "+role);
  
  const baseUrl = req.baseUrl.slice(5)

  
  console.log("param  ");
  console.log(req.params);



  switch (baseUrl) {
    case 'com' :

        Coms.findOne({  where: { id: req.params.id} })
        .then(data=>{

          console.log("com trouvé")
          console.log(userId === data.UserId || role ==="admin")


          if(userId === data.UserId || role ==="admin"){
            next();
          }
          else{
            console.log("action non autorisé");
            res.status(401).json({ message:"action non autorisé"});
          }

        })
        .catch(err=> {
          console.log("aucun com trouvé");
          res.status(401).json({ message:"action non autorisé"});

        })

    break;
    case 'post' :

        Posts.findOne({  where: { id: req.params.id} })
        .then(data=>{

          if(userId === data.UserId || role ==="admin"){
            next();
          }
          else{
            console.log("action non autorisé");
            res.status(401).json({ message:"action non autorisé"});

          }

        })
        .catch(err=> {
          console.log("aucun post trouvé");
          res.status(401).json({ message:"action non autorisé"});

        })

    break; 
    case 'user' :

    Users.findOne({  where: { id: req.params.id} })
    .then(data=>{

      if(id === data.UserId ){
        next();
      }
      else{
        console.log("action non autorisé");
        res.status(401).json({ message:"action non autorisé"});
      }

    })
    .catch(err=> {
      console.log("aucun user trouvé");
      res.status(401).json({ message:"action non autorisé"});

    })

    break;


    default:
      console.log(`probleme avec la route`);
      res.status(401).json({message: "action impossible"});

  }
    
}

