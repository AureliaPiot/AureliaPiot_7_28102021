const db =require("../models")
const Likes= db.likes;



const Op =db.Sequelize.Op;

exports.addPost = (req,res) =>{
    console.log(req.body)
    const like ={
        UserId:req.body.UserId,
        PostId:req.body.PostId
    };
    Likes.create(like)
    .then(data=>res.status(201).send("like ajouté"))
    .catch(err=> res.status(500).send({message: err.message}))
}
exports.addCom = (req,res) =>{
    console.log(req.body);
    const like ={
        UserId:req.body.UserId,
        ComId:req.body.ComId
    };
    Likes.create(like)
    .then(data=>res.status(201).send("like ajouté"))
    .catch(err=> res.status(500).send({message: err.message}))
}


exports.delete = (req,res) =>{
    Likes.destroy({ where : { id : req.params.id}})
    .then(data=>res.status(200).send("like enlever"))
    .catch(err=> res.status(500).send({message: err.message}))
  
}

