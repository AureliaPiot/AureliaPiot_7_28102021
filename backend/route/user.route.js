const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller.js");
const multer = require("../middleware/multer-config.js");
const test = require("../middleware/test.js");




// Create
router.post('/sign',userCtrl.create);
//sign
router.post('/login',userCtrl.login)


// get all
router.get('/',userCtrl.findAll);

// get one 
router.get('/:id',userCtrl.findOne);

// update with id
router.put('/file/:id',test,multer,userCtrl.updateFile);
router.put('/delete/file/:id',test,userCtrl.deleteFile);

router.put('/bio/:id',userCtrl.update);
router.put('/role/:id',userCtrl.update);


// delete whit id
router.delete('/:id',userCtrl.delete);

// fin url
// app.use('api/user')

module.exports = router;
