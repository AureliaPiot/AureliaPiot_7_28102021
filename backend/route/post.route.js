const express = require("express");
const router = express.Router();
const postCtrl = require("../controller/post.controller.js")

// Create
router.post('/',postCtrl.create);

// get all
router.get('/',postCtrl.getAll);
// get one 
router.get('/:id',postCtrl.getOne);
// update with id
router.put('/:id',postCtrl.update);
// delete whit id
router.delete('/:id',postCtrl.delete);

// fin url
// app.use('api/user')

module.exports = router;