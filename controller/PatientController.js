
const { CreatePatient } = require('../service/CreatePatient')
const { UpdatePatient } = require('../service/UpdatePatient')
const { DeletePatient } = require('../service/DeletePatient')
const express = require('express')
const router = express.Router()

router.post('/createPatient', CreatePatient)

router.post('/updatePatient', UpdatePatient)

router.post('/deletePatient', DeletePatient)

module.exports = router