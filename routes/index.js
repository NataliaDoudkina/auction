const express = require('express');
const router = express.Router();
let registerController=require('../controllers/userSignUp.js')

/* GET home page. */
router.get('/', registerController.getHomePage);

router.post('/', 
 registerController.register
)
router.get('/signout', registerController.signOut)


module.exports = router;
