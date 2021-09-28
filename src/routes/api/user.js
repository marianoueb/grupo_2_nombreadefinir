const express = require('express');
const router = express.Router();
const user = require('../../controllers/api/userAPIController');

router.get("/api/users/",user.index) 

router.get("/api/user/:id",user.show) 

module.exports = router