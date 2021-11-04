//action inscription, connexion + token identification
const db =require("../models")
//le lien ave la bdd
const User = db.users;
//le lien avec la table user de la bdd

const Op =db.Sequelize.Op;


const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');


// //////////////////////////////////////////////////////////////////////////////////////

exports.login = (req,res)=>{
  console.log('login');
  const user ={
    email : req.body.email,
    password : req.body.password
  }

  User.findOne({ where: { email : user.email} })
  .then(data=>{
    if(data){

      if (data.password == user.password) {
        console.log(data.role);

        // console.log(data);
        // res.header({redirection : "/home"});
        res.status(200).json({ 
          message:'utilisateur trouvé',
          userId: data.id,
          userEmail:data.email,
          token: jwt.sign(
            { userId: data.id,
              email: data.email,
              role: data.role  },
            process.env.TOKEN,
            { expiresIn: '24h' }
          ) 
        });

      } else {
        res.status(404).send({ message: `mot de passe incorrect` });
      }
    }
    else{
      res.status(404).send({ message: `utilisateur introuvable` });
    }

  })
  .catch(err=> {
      res.status(500).send({message: err.message || " error canot found any user"})
  })

};



// //////////////////////////////////////////////////////////////////////////////////////

// [Create]
exports.create = (req,res,err) =>{
    console.log('create-----------');
    console.log(req.body);
    console.log('create-----------');

// is Email unique ?---------
    function isEmailUnique (email, done) {
      User.count({ where: { email: email } })
      .then(count => {
        return (count > 0) ? true : false
      });
    }

    // recuperation des erreurs+ mise en forme

// is Email unique ?---------

    if(isEmailUnique){
      return res.status(400).json({ message :"Email déjà utilisé"} );
     
    }

    if(!req.body.email || !req.body.password){
      return res.status(400).json({ message : "champ vide" })
    
    }

        const user ={
      nom : req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: req.body.password,
      role:'user'
    };

    User.create(user)
         .then(data=>{
            res.status(201).send(data);
            // authentifier juste apres
        })
        .catch(err=> {
            res.status(500).send({message: err.message || "cannot create an account"})
        })
  

    // res.redirect('route');


    // const user =User.build({
    //   nom : req.body.nom,
    //   prenom: req.body.prenom,
    //   email: req.body.email,
    //   password: req.body.password,
    //   role:'user'
    // });

    // user.save()
    //      .then(data=>{
    //         res.status(200).send(data);
    //     })
    //     .catch(err=> {
    //         res.status(500).send({message: err.message || "cannot create an account"})
    //     })

};




// //////////////////////////////////////////////////////////////////////////////////////
// [get all]
exports.findAll = (req,res)=>{
    console.log('findAll');

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.TOKEN);
    const role = decodedToken.role;
    console.log("role = "+role);
    console.log(token);


    const name = req.query.name;
    // let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    User.findAll()
    .then(data=>{
        res.send(data);
        // console.log(data)
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


    User.findOne({ where: { id : 1} })
    .then(data=>{
        if (data) {
            res.send(data);
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
exports.update = (req,res)=>{
    console.log('update');
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "user was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating user with id=" + id
        });
    });
};

// //////////////////////////////////////////////////////////////////////////////////////
// [delete whit id]
exports.delete = (req,res)=>{
    console.log('delete');
    const id = req.params.id;

    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
};

// conditionnel ? Find all user with role = user:

// exports.findAllPublished = (req, res) => {
//     User.findAll({ where: { role: user } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };
