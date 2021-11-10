const db =require("../models")
const Likes= db.likes;



const Op =db.Sequelize.Op;

exports.addPost = (req,res) =>{
    // console.log(req.body)
    const like ={
        UserId:req.body.UserId,
        PostId:req.body.postId
    };
    console.log(like);
    Likes.create(like)
    .then(data=>res.status(201).send({message:"like ajouté"}))
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
    console.log('delete like')
    console.log(req.params);

    const params ={
        PostId:req.params.param1,
        UserId:req.params.param2
    };
    Likes.destroy({ 
        where : { UserId : params.UserId , PostId : params.PostId }})
    .then(data=>res.status(200).send({message:"like enlever"}))
    .catch(err=> res.status(500).send({message: err.message}))
  
}

