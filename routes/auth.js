const router = require('express').Router();
const { login, register } = require('../middleware/auth');

router.post('/register', register)
router.post('/login', login)

module.exports = router;