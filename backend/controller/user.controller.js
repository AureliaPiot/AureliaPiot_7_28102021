//action inscription, connexion + token identification
const db =require("../models")
//le lien ave la bdd
const Users = db.users;
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

  Users.findOne({ where: { email : user.email} })
  .then(data=>{
    if(data){

      if (data.password == user.password) {
        console.log(data.role);

        // console.log(data);
        // res.header({redirection : "/home"});
        res.status(200).json({ 
          message:'utilisateur trouvé',
          userId: data.id,
          userRole: data.role,
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
        
//  ou utiliser const user = Users.build({object}) | puis user.save() avec les th
        const user ={
          nom : req.body.nom,
          prenom: req.body.prenom,
          email: mail,
          password: req.body.password,
          role:'user'
        };
        
        Users.create(user)
        .then(data=>{
          res.status(201).json({ message : 'ok' });
// authentifier juste apres
        })
        .catch(err=> {
          res.status(500).send({message: err.message || "cannot create an account"})
        })
      }
      else{
        console.log('no');
        return res.status(403).json({ message : "email déjà utilisé" })
      }
    })
    
        


};




// //////////////////////////////////////////////////////////////////////////////////////
// [get all]
exports.findAll = (req,res)=>{
    console.log('findAll');

    // const token = req.headers.authorization.split(' ')[1];
    // const decodedToken = jwt.verify(token,process.env.TOKEN);
    // const role = decodedToken.role;
    // console.log("role = "+role);
    // console.log(token);


    // const name = req.query.name;
    // let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Users.findAll()
    .then(data=>{
        res.send(data);
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


    Users.findOne({ where: { id : 1} })
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

    Users.update(req.body, {
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

    Users.destroy({
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
//     Users.findAll({ where: { role: user } })
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
