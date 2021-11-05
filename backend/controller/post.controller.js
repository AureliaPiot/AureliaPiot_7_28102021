const db =require("../models")
const Post= db.posts;
const Op =db.Sequelize.Op;


exports.create = (req,res,err) =>{
    console.log('create-post----------');
    console.log(req.body);
    console.log('create- post----------');

    const post ={
      idUser: req.body.userId,
      content : req.body.message,
      attachement: req.body.file,
      like:[0],
      createDate:Date.now(),
    };
    console.log(post);


    Post.create(post)
         .then(data=>{
            res.status(201).send(data);
        })
        .catch(err=> {
            res.status(500).send({message: err.message || "cannot create an account"})
        })
  
};


exports.getAll = (req,res,err) =>{
    console.log('findAll post');


    const name = req.query.name;
    // let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    User.findAll({ 
        order: ['createDate', 'DESC'],
        include: [{
            model: models.Users,
            through: {
                attributes: ['userid', 'userId'],
            },
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


exports.getOne = (req,res,err) =>{};
exports.update = (req,res,err) =>{};
exports.delete = (req,res,err) =>{};

