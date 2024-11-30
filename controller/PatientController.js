
const { CreatePatient , CreatePatients } = require('../service/CreatePatient')
const { UpdatePatients } = require('../service/UpdatePatient')
const { MovePatientToPastPatients } = require('../service/DeletePatient')
const { fetchAllDepartments } = require('../service/FetchDepartments')
const { fetchPatients} = require('../service/FetchPatients')
const {CreateDepartment} = require('../service/CreateDepartment')
const express = require('express')
const router = express.Router()


router.get('/fetchDepartments', fetchAllDepartments)

router.post('/fetchPatients', fetchPatients)

router.post('/createPatient', CreatePatient)

router.post('/createPatients', CreatePatients)

router.post('/updatePatients', UpdatePatients)

router.post('/deletePatient', MovePatientToPastPatients)

router.post('/createDepartment', CreateDepartment)

router.get('/testconnection', (req, res) => {
    res.json({message:"Connection Successful"})
})

module.exports = router