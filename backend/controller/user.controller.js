//action inscription, connexion + token identification
const db =require("../models")
//le lien ave la bdd
const Users = db.users;

const Posts= db.posts;
const Coms= db.coms;
const Likes = db.likes;

//le lien avec la table user de la bdd

const Op =db.Sequelize.Op;

const fs = require('fs');


const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { getAll } = require("./post.controller");


// //////////////////////////////////////////////////////////////////////////////////////

exports.login = (req,res)=>{
  console.log('login');

  const user ={
    email : req.body.email,
    password : req.body.password
  }
  console.log(user);

  Users.findOne({ where: { email : user.email} })
  .then(data=>{
    if(data){
      bcrypt.compare(user.password + process.env.PASSWORD ,data.password)
        .then(valid => {
        if(!valid) {
            return res.status(401).json({message:'mot de passe incorrect'})
          } 


        console.log(data.role);

        res.status(200).json({ 

          profilePic: data.profilePic,
          userId: data.id,
          userRole: data.role,

          token: jwt.sign(
            { userId: data.id,
              email: data.email,
              role: data.role  },
            process.env.TOKEN,
            { expiresIn: '24h' }
          ) 
        });

        })
        .catch(error => res.status(500).json({ error }))
        }
    else{
      res.status(401).send({ message: `utilisateur introuvable` });
    }
  })
  .catch(err=> {
      res.status(500).send({message: err.message || " error canot found any user"})
  })

};


// //////////////////////////////////////////////////////////////////////////////////////

// [Create]
exports.create = (req,res,err) =>{
    console.log('create body-----------');
    console.log(req.body);
    console.log('create-----------');
    const mail = req.body.email;

    if(!req.body.email || !req.body.password){
      return res.status(400).json({ message : "champ vide" })   
    }

// is Email unique ?---------
    Users.count({ where: { email: mail } })
    .then(count => {

      if (count === 0){
        console.log('user ');
        
        bcrypt.hash( req.body.password + process.env.PASSWORD,10)
        .then(hash =>{

          const user ={
            nom : req.body.nom,
            prenom: req.body.prenom,
            email: mail,
            password: hash,
            role:'user',
            profilPic:`http://localhost:3000/images/defaultPic/default.jpg`
          };
          
          Users.create(user)
          .then(data=>{
            res.status(201).json({ message : 'compte créé' });
            // authentifier juste apres
          })
          .catch(err=> {
            res.status(500).json({error: err.message || "cannot create an account"})
          })
        })//fin hash

      }
      else{
        console.log('email déjà utilisé');
        return res.status(403).json({ error : "email déjà utilisé" })
      }
    })
    
};


// //////////////////////////////////////////////////////////////////////////////////////
// [get all]
// (barre de recherche des users)
exports.findAll = (req,res)=>{
    console.log('findAll with query');
    console.log(req.params.query);
    const getAllCharacters= req.params.query.split('')
    console.log(getAllCharacters);



    Users.findAll({
      where : { [Op.or]:[

       { prenom:{[Op.like]: "%"+req.params.query+"%"}},
       { nom:{[Op.like]: "%"+req.params.query+"%"}}
      ]
      },
      attributes: {exclude: ['password']}
    })
    .then(data=>{
        res.status(200).send(data);
        console.log(data)
    })
    .catch(err=> {
        res.status(500).send({message: err.message || " error canot found any user"})
    })

};

// //////////////////////////////////////////////////////////////////////////////////////
// [get one ]
exports.findOne = (req,res)=>{
    console.log('findOne');

    const id = req.params.id;
    console.log("id  "+id);


    Users.findOne({ where: { id : id} ,  attributes: {exclude: ['password']}, })
    .then(data=>{
        if (data) {
            res.status(200).send(data);
            console.log('data findone ' + data);
          } else {

            res.status(404).send({
              message: `Cannot find Tutorial with id=${id}.`
            });
        }
    })
    .catch(err=> {
        res.status(500).send({message: err.message || " error canot found any user"})
    })

};

// //////////////////////////////////////////////////////////////////////////////////////
// [update with id]

exports.updateName = (req,res)=>{
  console.log('update name---------------------------------');
  const id = req.params.id;
  // let bodyKey = Object.keys(req.body)
  console.log(id);
  console.log(req.body);
  
  Users.update(req.body,
    {where : {id: req.params.id} }
     )
  .then(() => res.status(200).send({message: 'user modifié'}))
  .catch(err=> { res.status(404).send({message: err.message || " error canot update post"}) });
  // res.status(200).send({message: 'user modifié | nom :' + req.body.nom +"  + prenom :"+req.body.prenom })
};

// //////////////////////////////////////////////////////////////////////////////////////
// [update with id][FILE]
exports.updateFile = (req,res)=>{
    console.log('update user File---------------------------------');
    const id = req.params.id;
    // let bodyKey = Object.keys(req.body)
    console.log(id);
    console.log(req.body);
    console.log(req.file);


    const oldFile = req.body.oldFile;
    const newFile = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` ;

    console.log("newFile");
    console.log(newFile);

   
    
    console.log("oldFile");
    console.log(oldFile);
    const oldFilename = oldFile.split("/images/")[1];
    console.log(oldFilename);

      // if(filename !== oldFile){
        if( oldFilename !=="defaultPic/default.jpg"){
          console.log('not the same');

        fs.unlink(`images/${oldFilename}`,()=>{
          console.log('unlink old profilePic');
          
        });
      }//if

      Users.update({"profilePic": newFile},
      {where : {id: req.params.id} }
      )
      .then(() => res.status(200).send({message: 'user modifié'}))
      .catch(err=> { res.status(404).send({message: err.message || " error canot update post"}) });

          
};
// [delete file]//////////////////////////////////////////////////////

exports.deleteFile = (req,res)=>{
  console.log('update user delete File---------------------------------');
  const id = req.params.id;

  console.log(id);
  console.log(req.body);

  const oldFile = req.body.oldFile;
  const newFile = `${req.protocol}://${req.get('host')}/images/defaultPic/default.jpg` ;

  const oldFilename = oldFile.split("/images/")[1];
  console.log(oldFilename);

    // if(filename !== oldFile){
      if( oldFilename !=="defaultPic/default.jpg"){
        console.log('can delete file');

      fs.unlink(`images/${oldFilename}`,()=>{
        console.log('unlink old profilePic');
        
      });
    }//if

    Users.update({"profilePic": newFile},
    {where : {id: req.params.id} }
    )
    .then(() => res.status(200).send({message: 'user modifié'}))
    .catch(err=> { res.status(404).send({message: err.message || " error canot update post"}) });

        
};
// [UPDATE BIO / ROLE  ]//////////////////////////////////////////////////////


exports.update = (req,res)=>{
  console.log('update (bio || role || nom || prenom  ---------------------------------');
  const id = req.params.id;
  console.log(id);
  console.log(req.body);
  
  Users.update(req.body,
    {where : {id: req.params.id} }
     )
  .then(() => res.status(200).send({message: 'user modifié'}))
  .catch(err=> { res.status(404).send({message: err.message || " error canot update post"}) });
};



// //////////////////////////////////////////////////////////////////////////////////////
// [delete whit id]
exports.delete = (req,res)=>{
    console.log('delete');
    const id = req.params.id;

    Coms.destroy( {where : {UserId: id} });
    Likes.destroy( {where : {UserId: id} });

    Posts.findAll({ where: { UserId : id}})
      .then(data=>{

        data.forEach(post => {
            const filename = post.attachement.split("/images/")[1];
            fs.unlink(`images/${filename}`,()=>{
              console.log('unlink post attachement');
            });
        });//for each

      })//then findAll
      .then(()=>{
        Posts.destroy( {where : {UserId: id} });
      })

    Users.findOne({ where: { id : id} ,  attributes: {exclude: ['password']}, })
    .then(data=>{ 
      
      //suppression de la photo de profile (sauf si c'est celle par defaut)
      const filename = data.profilePic.split("/images/")[1];
      if( filename !=="defaultPic/default.jpg") {
        fs.unlink(`images/${filename}`,()=>{
          console.log('unlink profilePic');
        });
      }
    })
    .then(()=>{
      Users.destroy( {where : {id: id} })
      .then(()=>{
        res.send({ message: "user was deleted successfully!" });
      })
    })
    .catch(err=> { res.status(500).send({message: err.message || " error delete User"}) });

};

