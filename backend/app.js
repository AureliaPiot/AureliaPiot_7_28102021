const express = require('express');
const app = express();

const db = require("./models/index.js");
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// db.sequelize.sync();

const userRoutes = require('./route/user.route.js');

app.use(express.json());

// autorisation du front a interagire avec le back
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
console.log(process.env.ENV)
// --
// connexion a la base de donnée mysql de phpMyAdmin
// DataBase 
// const mysql = require("mysql");
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "projet_7"
// });
// db.connect(function(err){
//   if(err){
//     console.log('Error connecting to Db');
//     return;
//   }
//   console.log('Connection established');
// });
// --

//[avec sequelized] _______________________________________


// _______________________________________





app.use('/api/user/',userRoutes);

//__ Test middlseware recupe des infos user
// app.use((req, res , next)=>{
//     db.query('SELECT * FROM user',function(err,rows){
//         console.log(rows);
//         let data = rows;
//         console.log("Outside--"+data.id);
//         // res.render('userIndex', { title: 'User Information', dataGet: data });
//         res.json({'info': data });
//     });
// });
//__ recupe des infos user



module.exports =app;


