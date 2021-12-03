const express = require("express");
const router = express.Router();
const comsCtrl = require("../controller/coms.controller.js");

const auth =require("../middleware/auth.js")



// Create
router.post('/',auth.user,comsCtrl.create);

// get all
router.get('/all',auth.connect,comsCtrl.getAll);
// get all where user = query
router.get('/user/:user',auth.connect,comsCtrl.getAllByUser);
// get all where post = query
router.get('/post/:post',auth.connect,comsCtrl.getAllByPost);
// get one 
router.get('/:id',auth.connect,comsCtrl.getOne);

// update with id
router.put('/:id',auth.action,comsCtrl.update);
// delete whit id
router.delete('/:id',auth.action,comsCtrl.delete);

// fin url

module.exports = router;