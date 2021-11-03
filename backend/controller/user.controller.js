//action inscription, connexion + token identification

const db =require("../models")
//le lien ave la bdd
const User = db.users;
//le lien avec la table user de la bdd

const Op =db.Sequelize.Op;


const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');




// [Create]
exports.create = (req,res) =>{
    console.log('create-----------');
    console.log(req.body);
    console.log('create-----------');


    if(!req.body.email || !req.body.password){
        res.status(400).send({mesage:"content cannot be empty"});
        return
    }
    
    const user ={
      nom : req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: req.body.password,
      role:'user'
    }


    User.create({
      nom : user.nom,
      prenom: user.prenom,
      email: user.email,
      password: user.password,
      role:user.role
    })
        .then(data=>{
            res.status(200).send(data);
        })
        .catch(err=> {
            res.status(500).send({message: "an error occured while creating a new user"})
        })

};




// [get all]
exports.findAll = (req,res)=>{
    console.log('findAll');

    const name = req.query.name;
    // let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    User.findAll({attributes: { exclude: ['role'] }})
    .then(data=>{
        res.send(data);
        console.log(data)
    })
    .catch(err=> {
        res.status(500).send({message: err.message || " error canot found any user"})
    })

};


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
