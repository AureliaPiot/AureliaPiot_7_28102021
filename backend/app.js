const express = require('express');
const app = express();
const fs = require("fs");

const db = require("./models/index.js");


const helmet = require("helmet");

// pour vide et synchoniser les tables par rapport aux model------

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// pour  synchoniser les tables par rapport aux model------

// db.sequelize.sync();

// pour demarrer le back-----

// nodemon --exec 'node -r dotenv/config server.js'

app.use(express.json());

app.use(helmet());


// autorisation du front a interagire avec le back
app.use((req,res,next)=>{

if(req.headers.origin === 'http://localhost:8080' || req.headers.origin === 'http://192.168.1.5:8080' ){
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.set("Content-Security-Policy", `default-src 'self' ${req.headers.origin}`);
}
// restriction à 2 origines, le local ou le network

  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
console.log(process.env.ENV)

const userRoutes = require('./route/user.route.js');
const postRoutes = require('./route/post.route.js');
const comsRoutes = require('./route/coms.route.js');
const likeRoutes = require('./route/like.route.js');



app.use('/api/user/',userRoutes);
app.use('/api/post/',postRoutes);
app.use('/api/com/',comsRoutes);
app.use('/api/like/',likeRoutes);


const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));
// pour indiquer où enregistrer les images


module.exports =app;


