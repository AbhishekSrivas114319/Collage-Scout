const router = require('express').Router();
const consumerController = require('../controllers/consumer')

router.post('/shopList',consumerController.getShop)



module.exports = router;