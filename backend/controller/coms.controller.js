const db =require("../models")
const Coms= db.coms;

const Op =db.Sequelize.Op;


exports.create = (req,res) =>{
    console.log('create-coms----------');
    console.log(req.body);

    const com = Coms.build({
        PostId: req.body.PostId,
        UserId: req.body.UserId,
        content: req.body.content,
        createDate:req.body.createDate,
    })
    console.log('com');

    console.log(com);

    com.save()
         .then(data=>{
            res.status(201).send({data : data, message :"com creer"});
        })
        .catch(err=> {
            res.status(500).send({message: err.message || "cannot create a coms"})
        })
  
};


exports.getAll = (req,res) =>{
    console.log('findAll coms');
    Coms.findAll(    {
        order: [['id', 'DESC']],
        // where:{PostId : 4}
        include: [{
            all:true,
            attributes: {exclude: ['password']},
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
    console.log('findAll  coms by Post');
    const PostId = req.params.post;
    console.log(req.params);
    console.log(PostId);


    Coms.findAll({ 
        order: [['createDate', 'DESC']],
        where:{PostId : PostId},
        include: [{
            all:true,
            attributes: {exclude: ['password']},
        }],
    })
    .then(data=>{
        res.status(200).send(data);
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



exports.update = (req,res) =>{
    console.log('update');
    console.log(req.params);
    console.log(req.body);

    Coms.update({content: req.body.newContent},
        {where : {id: req.params.id} }
         )
    .then(() => res.status(200).send({message: 'commentaire modifié'}))
    .catch(err=> { res.status(404).send({message: err.message || " error canot update post"}) });


};

exports.delete = (req,res) =>{

        console.log(req.params);
  
        Coms.destroy( {where : {id: req.params.id} })
        .then(() => res.status(200).send({message: 'commentaire supprimé'}))
        .catch(err=> { res.status(404).send({message: err.message || " error canot delete post"}) });

}

