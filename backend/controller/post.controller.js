const db =require("../models")
const Posts= db.posts;
// const Users= db.users;

const Op =db.Sequelize.Op;


exports.create = (req,res,err) =>{
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
      like:[0],
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


exports.getAll = (req,res,err) =>{
    console.log('findAll post');


    // const name = req.query.name;
    // let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Posts.findAll({ 
        order: [['id', 'DESC']],
        include: [{
            model: db.users,
            // through: {
            //     attributes: ['id','UserId'],
            // },
        }],
    })
    .then(data=>{
        res.send(data);
        console.log(data)
    })
    .catch(err=> {
        res.status(500).send({message: err.message || " error canot found any user"})
    })

};


exports.getOne = (req,res,err) =>{};
exports.update = (req,res,err) =>{};
exports.delete = (req,res,err) =>{};

