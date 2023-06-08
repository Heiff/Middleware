const { Router } = require('express');
const {Register,Login} = require('../controller/admin');
const router = Router()

router.post('/admin/reg',Register);
router.post('/admin/log',Login);


module.exports = router;