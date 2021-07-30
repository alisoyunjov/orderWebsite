
const express = require('express');
const OrderCtrl = require('../../controllers/OrderCtrl');
const passport = require('passport');
const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), OrderCtrl.createOrder);

router.put('/order/:id', OrderCtrl.updateOrder);

router.delete('/:id', OrderCtrl.deleteOrder);

// router.get('/:id', OrderCtrl.getOrderById);

router.get('/', OrderCtrl.getAllOrders);

router.get('/person', OrderCtrl.getOrdersbyPerson);

router.get('/submission', OrderCtrl.getSubmissions);

router.get('/status', OrderCtrl.getFinishedOrders);


module.exports = router;