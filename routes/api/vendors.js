const express = require('express');

const VendorCtrl = require('../../controllers/VendorCtrl');
const passport = require('passport');
const router = express.Router();

//router.get('/trending', EventCtrl.getTrending);
router.post('/MakeVendor', VendorCtrl.createVendor)
//router.post('/CreateEvent', passport.authenticate('jwt', { session: false }), EventCtrl.createEvent);
// router.put('/:id', passport.authenticate('jwt', { session: false }), EventCtrl.updateEvent);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), EventCtrl.deleteEvent);
// router.get('/:id', EventCtrl.getEventById);
// router.put('/:id/join', passport.authenticate('jwt', { session: false }), EventCtrl.joinEvent);
router.get('/', VendorCtrl.getVendors);
router.get('/allVendors', VendorCtrl.getAllVendors);
router.get('/getSubmissions', VendorCtrl.getSubmissions);
router.get('/getFinishedVendors', VendorCtrl.getFinishedVendors);
router.put('/vendor/:id', VendorCtrl.updateVendor)
router.delete('/vendor/:id', VendorCtrl.deleteVendor)
router.get('/vendor/:id', VendorCtrl.getVendorById)

module.exports = router;