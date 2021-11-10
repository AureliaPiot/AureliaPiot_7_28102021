const express = require("express");
const router = express.Router();
const likeCtrl = require("../controller/like.controller.js");

const auth =require("../middleware/auth.js")



// add
router.post('/post',auth.user,likeCtrl.addPost);
router.post('/com',auth.user,likeCtrl.addCom);


router.delete('/:id',auth.user,likeCtrl.delete);


module.exports = router;