const db =require("../models")
const Posts= db.posts;
const Coms= db.coms;
const Likes = db.likes;

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
            res.status(201).send("post créer");
        })
        .catch(err=> {
            res.status(500).send({message: err.message || "cannot create an account"})
        })
  
};


exports.getAll = (req,res) =>{
    console.log('findAll post');
    Posts.findAll({ 
        order: [['id', 'DESC']],
        include: [{ all:true }],
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
        where:{userid : userId},
        include: [{
            // model: db.users,
            all:true
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



exports.update = (req,res) =>{
    console.log(req.params);
    console.log(req.body);
    console.log(req.file);

    let newFile = null;

    const oldFile = req.body.oldFile;

    console.log(oldFile);
    console.log(newFile);


// si une nouvelle image est present , on supprime l'anciene
    if( req.file !== undefined ){
        newFile = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` ;
        console.log('newFile present');
        const filename = oldFile.split("/images/")[1];
        fs.unlink(`images/${filename}`,()=>{
            console.log('unlink old attachement');
        });
    }

// si une nouvelle image n'est pas presente , garde l'anciene
    else if (req.body.clearFile){
        newFile = "null" ;
    }

    else if(req.body.file == "undefined" && req.file == undefined && oldFile !== undefined){
        newFile = oldFile ;
    }
    else if(req.body.file == "undefined" && req.file == undefined && oldFile == undefined ){
        newFile = "null" ;
    }

    Posts.update(
        { content : req.body.content,
          attachement : newFile },
        { where: { id: req.params.id } }
      )
    .then(() => res.status(200).send({message: 'post modifié'}))
    .catch(err=> { res.status(500).send({message: err.message || " error canot update post"}) });

};





exports.delete = (req,res) =>{
    
    Posts.findOne( {where :{id: req.params.id}} )
    .then(data =>{
        console.log(req.params);
        console.log(data);
        if(data !== null){
            // console.log(data.attachement == "null");
            Coms.destroy( {where : {PostId: req.params.id} });
            Likes.destroy( {where : {PostId: req.params.id} });

            
            if(data.attachement == "null"){
                console.log('if');
                
                Posts.destroy( {where : {id: req.params.id} })
                .then(() => res.status(200).send({message: 'post supprimé'}))
                .catch(err=> { res.status(404).send({message: err.message || " error canot delete post"}) });

            // return
            }
            else{
                console.log('else');
                
                const filename = data.attachement.split("/images/")[1];
                console.log(filename);
                fs.unlink(`images/${filename}`,()=>{
                    console.log('unlink');
                    
                    Posts.destroy( {where : {id: req.params.id} })
                    .then(() => res.status(200).send({message: 'post supprimé'}))
                    .catch(err=> { res.status(404).send({message: err.message || " error canot delete post"}) });
                });
            // return

            }
        }else{
             res.status(404).send({message: "error canot find any post"}) 
        }
            
    })
    .catch(err=> { res.status(404).send({message: err.message || " error canot find any post"}) });



    // si la longueur du tableau retourner par les likes est spperieur a 1 alors on chop tout les commentaire lier au post et on les supprime aussi
}

