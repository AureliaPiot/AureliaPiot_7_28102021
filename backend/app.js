const express = require('express');
const app = express();

app.use(express.json());
// --
// connexion a la base de donnée mysql de phpMyAdmin
// DataBase 
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projet_7"
});
db.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
// --
//__ recupe des infos user
app.use((req, res , next)=>{
    db.query('SELECT * FROM user',function(err,rows){
        console.log(rows);
        let data = rows;
        console.log("Outside--"+data.id);
        // res.render('userIndex', { title: 'User Information', dataGet: data });
        res.json({'info': data });
    });
});
//__ recupe des infos user


module.exports =app;


