const express = require("express");
const router = express.Router();
const postCtrl = require("../controller/post.controller.js");
const auth =require("../middleware/auth.js")
const multer = require("../middleware/multer-config.js");


// Create
router.post('/',auth.user,multer,postCtrl.create);
// get all
router.get('/',auth.user,postCtrl.getAll);
// get one 
router.get('/:id',auth.user,postCtrl.getOne);
// update with id
router.put('/:id',auth.user,multer,postCtrl.update);
// delete whit id
router.delete('/:id',auth.user,postCtrl.delete);

// fin url
// app.use('api/user')

module.exports = router;