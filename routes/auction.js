const express = require('express');
const router = express.Router();
const auctionController=require('../controllers/auctionController')

router.get('/', auctionController.getItems 
);

router.post('/', auctionController.getBid)



module.exports = router;

