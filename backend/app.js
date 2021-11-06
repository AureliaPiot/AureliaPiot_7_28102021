const express = require('express');
const app = express();
const fs = require("fs");

const db = require("./models/index.js");
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// db.sequelize.sync();


app.use(express.json());

// autorisation du front a interagire avec le back
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
console.log(process.env.ENV)

const userRoutes = require('./route/user.route.js');
const postRoutes = require('./route/post.route.js');
// const comsRoutes = require('./route/coms.route.js');


app.use('/api/user/',userRoutes);
app.use('/api/post/',postRoutes);
// app.use('/api/coms/',userRoutes);

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));
// pour indiquer où enregistrer les images


module.exports =app;


