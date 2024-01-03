const express = require("express");
const router = express.Router();
const {postUser,getUser,updateUser,deleteUser, userLogin} = require('../controller/userController');


router.route('/register').get(getUser).post(postUser);
router.route('/login').post(userLogin);
router.route('/:id').put(updateUser).delete(deleteUser);


module.exports = router;