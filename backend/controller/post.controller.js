const db =require("../models")
const Posts= db.posts;
const fs = require('fs');


const Op =db.Sequelize.Op;


exports.create = (req,res) =>{
    console.log('create-post----------');
    console.log(req.body);
    console.log(req.body.userId);

    console.log('create- post----------');

    let  attachement ="";

    if(req.body.file !=="null"){
        attachement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    else{
        attachement =req.body.file;
    }

    const post ={
      UserId: req.body.userId,
      content : req.body.message,
      attachement: attachement,
      like: req.body.like,
      createDate:Date.now(),
    };
    console.log(post);


    Posts.create(post)
         .then(data=>{
            res.status(201).send(data);
        })
        .catch(err=> {
            res.status(500).send({message: err.message || "cannot create an account"})
        })
  
};


exports.getAll = (req,res) =>{
    console.log('findAll post');
    Posts.findAll({ 
        order: [['id', 'DESC']],
        include: [{
            model: db.users,
        }],
    })
    .then(data=>{
        res.send(data);
        // console.log(data)
    })
    .catch(err=> {
        res.status(500).send({message: err.message || " error canot found any user"})
    })

};




exports.getAllByUser = (req,res) =>{
    console.log('findAll  post by user');
    const userId = req.params.user;
    console.log(userId);

    Posts.findAll({ 
        order: [['id', 'DESC']],
        include: [{
            model: db.users,
            where:{id : userId}
        }],
    })
    .then(data=>{
        console.log("data");
        console.log(data);
        console.log("data");

        res.send(data);
        // console.log(data)
    })
    .catch(err=> {
        res.status(500).send({message: err.message || " error canot found any user"})
    })

};





exports.getOne = (req,res) =>{
    console.log('find one post');
    // noter les controoler avec de params (voir routes)
    const id = req.params.id;
    Posts.findOne({  where: { id: id} })
    .then(data=>{res.send(data);console.log(data)})
    .catch(err=> {
        res.status(500).send({message: err.message || " error canot found any post"})
    })
};

exports.update = (req,res) =>{};

exports.delete = (req,res) =>{
    
    Posts.findOne( {where :{id: req.params.id}} )
    .then(data =>{
        console.log(req.params);
        console.log(data);
        // if(data !== null){
            // console.log(data.attachement == "null");
            
            if(data.attachement == "null"){
                console.log('if');
                
                Posts.destroy( {where : {id: req.params.id} })
                .then(() => res.status(200).send({message: 'post supprimé'}))
                .catch(error => res.status(404).send({message:  "error cannot delete post"}));
            return
                
            }
            else{
                console.log('else');
                
                const filename = data.attachement.split("/images/")[1];
                fs.unlink(`../images/${filename}`,()=>{
                    console.log('unlink');
                    
                    Posts.destroy( {where : {id: req.params.id} })
                    .then(() => res.status(200).send({message: 'post supprimé'}))
                    .catch(error => res.status(404).send({message:  "error cannot delete post"}));
                });
            return

            }
        // }
            
    })
    .catch(console.log('delete error'),res.status(500).send({message:  "error cannot found any post"}))
}

