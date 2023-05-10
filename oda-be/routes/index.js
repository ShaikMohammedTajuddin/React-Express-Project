var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index')
const auth = require('../common/auth')

router.get('/', indexController.handleHome);

//Apply Appointment
router.post('/apply-appointment',auth.validate,indexController.handleApplyAppointment)

//Change status of appointment by admin only
router.put('/change-status/:id/:toStatus',auth.validate,auth.roleAdmin,indexController.handleChangeStatus)

//cancel appointment on user side
router.put('/cancel-appintment/:id',auth.validate, indexController.handleCancelAppointment)

//get details of selected appointment id
router.get('/appointmentbyId/:id',auth.validate,indexController.handleGetAppointmentById)

//List all Appointments based on status
router.get('/appointmentbyStatus/:status',auth.validate,auth.roleAdmin,indexController.handleGetAppointmentByStatus)

//List all Appointments of a user
router.get('/users-appointment/:id',auth.validate,indexController.handleGetAppointmentByUser)

module.exports = router;
