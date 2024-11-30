const express = require('express')
const cors = require('cors')
const app = express()
const { connect } = require('./database/ConnectSQL')
const {CreateTables} = require('./service/CreateTables')
const createrouter = require('./controller/PatientController')

const port = 5000

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', createrouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

connect()
CreateTables()


