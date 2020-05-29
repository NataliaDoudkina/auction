const express = require('express');
const router = express.Router();
let adminController=require('../controllers/adminController.js')

router.get('/', adminController.getHomePage);
  

router.post('/', 
  adminController.displayUsers
)

module.exports = router;