const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./src/routes/indexRoutes')
const { connection } = require('./src/db')
const port = process.env.PORT || 3001

const server = express()
server.use(morgan('dev'))
server.use(cors()) 
server.use(express.json())
server.use(router)


server.listen(3001, connection.sync({force:false}).then(()=> console.log('listen in port 3001')))