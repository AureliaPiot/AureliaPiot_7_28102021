const express = require("express");
const router = express.Router();
const postCtrl = require("../controller/post.controller.js");
const auth =require("../middleware/auth.js")
const multer = require("../middleware/multer-config.js");


// Create
router.post('/',auth.user,multer,postCtrl.create);

// get all
router.get('/all',auth.connect,postCtrl.getAll);
// get all where user = query
router.get('/user/:user',auth.connect,postCtrl.getAllByUser);
// get one 
router.get('/:id',auth.connect,postCtrl.getOne);

// update with id
router.put('/:id',auth.action,multer,postCtrl.update);
// delete whit id
router.delete('/:id',auth.action,postCtrl.delete);

// fin url
// app.use('api/user')

module.exports = router;