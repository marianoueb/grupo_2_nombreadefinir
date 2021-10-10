const express = require('express');
const router = express.Router();
const user = require('../../controllers/api/userAPIController');

router.get("/api/users/",user.index); 

router.get("/api/user/:id",user.show);

router.get("/api/users/total", user.admin);

router.get("/api/users/last", user.lastRegistered);

router.get("/api/users/admin", user.admins);

router.get("/api/users/sales", user.sales);

module.exports = router