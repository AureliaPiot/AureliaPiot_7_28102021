const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller.js")


// Create

router.post('/',userCtrl.create);
// get all
router.get('/',userCtrl.findAll);
// get one 
router.get('/:id',userCtrl.findOne);
// update with id
router.put('/:id',userCtrl.update);
// delete whit id
router.delete('/:id',userCtrl.delete);

// fin url
// app.use('api/user')

module.exports = router;


// module.exports = app => {
//     const users = require("../controller/user.controller.js");
  
//     var router = require("express").Router();
  
//     // Create a new Tutorial
//     router.post("/", users.create);
  
//     // Retrieve all users
//     router.get("/", users.findAll);
  
//     // Retrieve a single Tutorial with id
//     router.get("/:id", users.findOne);
  
//     // Update a Tutorial with id
//     router.put("/:id", users.update);
  
//     // Delete a Tutorial with id
//     router.delete("/:id", users.delete);
  
  
//     app.use('/api/user', router);
//   };
