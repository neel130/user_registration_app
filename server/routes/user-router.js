const express = require('express');
const { getSingleUser, updateUser } = require('../Controllers/userController');
const VerifyToken = require('../Middleware/Authorization');
const router = express.Router();


router.get("/:id",VerifyToken,getSingleUser);
router.put("/update/:id",VerifyToken,updateUser)





module.exports = router ;