const {getAllUsers,createUser, updateUser, deleteUser} = require('../controllers/user');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken')
const router = require('express').Router();


router.get('/',verifyUser , getAllUsers);
router.put('/:id',verifyUser , updateUser);
router.delete('/:id',verifyAdmin , deleteUser);

module.exports = router;
