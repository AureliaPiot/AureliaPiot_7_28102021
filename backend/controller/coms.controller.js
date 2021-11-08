const db =require("../models")
const Coms= db.coms;

const Op =db.Sequelize.Op;


exports.create = (req,res) =>{
    console.log('create-coms----------');
    console.log(req.body);

    const com = Coms.build({
        content:req.body,
        createDate:Date.now(),
        PostId:req.body.postId,
        UserId:req.body.userId,
    })
    Coms.create(com)
         .then(data=>{
            res.status(201).send("post créer");
        })
        .catch(err=> {
            res.status(500).send({message: err.message || "cannot create a coms"})
        })
  
};


exports.getAll = (req,res) =>{
    console.log('findAll coms');
    Coms.findAll({ 
        order: [['id', 'DESC']],
        include: [{
            model: db.users,
            model: db.posts,
        }],
    })
    .then(data=>{
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({message: err.message || " error canot found any coms"})
    })

};


exports.getAllByPost = (req,res) =>{
    console.log('findAll  post by Post');
    const PostId = req.params.post;
    console.log(PostId);

    Coms.findAll({ 
        order: [['id', 'DESC']],
        include: [{
            model: db.posts,
            where:{id : PostId}
        }],
    })
    .then(data=>{
        console.log("data");
        console.log(data);
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({message: err.message || " error canot found any coms"})
    })

};

exports.getAllByUser = (req,res) =>{
    console.log('findAll  coms by user');
    const userId = req.params.user;
    console.log(userId);

    Coms.findAll({ 
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
        res.status(500).send({message: err.message || " error canot found any coms"})
    })

};


exports.getOne = (req,res) =>{
    console.log('find one post');
    const id = req.params.id;
    Coms.findOne({  where: { id: id} })
    .then(data=>{res.send(data);console.log(data)})
    .catch(err=> {
        res.status(500).send({message: err.message || " error canot found any coms"})
    })
};



exports.update = (req,res) =>{};

exports.delete = (req,res) =>{
    
    Coms.findOne( {where :{id: req.params.id}} )
    .then(data =>{
        console.log(req.params);
        console.log(data);
        if(data !== null){
  
            Posts.destroy( {where : {id: req.params.id} })
            .then(() => res.status(200).send({message: 'post supprimé'}))
            .catch(err=> { res.status(404).send({message: err.message || " error canot delete post"}) });

        }else{
             res.status(404).send({message: "error canot find any coms"}) 
        }   
    })
    .catch(err=> { res.status(404).send({message: err.message || " error canot find any post"}) });

}

