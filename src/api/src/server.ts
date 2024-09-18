import express from 'express'
import compression from 'compression'
import cors from 'cors'
import router from './routes/routes'

const server = express()

server.use(
  cors({
    credentials: true
  })
)
server.use(compression())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

//// dashboard
server.get('/dashboard', router)

//// The books route
server.get('/books', router)

server.get('/books/:id', router)

server.post('/books', router)

server.patch('/books/:id', router)

server.delete('/books/:id', router)

// ================////

/// The customers routes

server.get('/clients', router)

server.get('/clients/:id', router)

server.post('/clients', router)

server.patch('/clients', router)
/// =====================//

//=========Transaction routes=======//
server.get('/sales', router)

server.post('/sales', router)

//=====transaction relating to a specific customer===//
server.get('/sales/filter', router) //E.g, localhost:3001/sales/filter?{customerId}

export default server
