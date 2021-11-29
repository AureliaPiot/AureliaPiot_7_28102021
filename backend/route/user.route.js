const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller.js");
const multer = require("../middleware/multer-config.js");
const auth =require("../middleware/auth.js")





// Create
router.post('/sign',userCtrl.create);
//sign
router.post('/login',userCtrl.login)


// get all (query)
router.get('/search/:query',auth.connect,userCtrl.findAll);

// get one 
router.get('/:id',auth.connect,userCtrl.findOne);

// update with id
router.put('/file/:id',auth.connect,multer,userCtrl.updateFile);
router.put('/delete/file/:id',auth.connect,userCtrl.deleteFile);

router.put('/bio/:id',auth.connect,userCtrl.update);
router.put('/role/:id',auth.admin,userCtrl.update);


// delete whit id
router.delete('/:id',auth.action,userCtrl.delete);

// fin url
// app.use('api/user')

module.exports = router;
