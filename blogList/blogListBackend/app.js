
//######################
// assembles routers and middleware and connects to mongodbserver
//######################



// imports express framework
const express = require('express')
require('express-async-errors')
// use expresss
const app = express()
// imports cors
const cors = require('cors')

// this files defines handlers for requests made to /blogss
const blogsRouter = require('./controllers/blogs')
// this files defines handlers for requests made to /users
const usersRouter = require('./controllers/users')
// this files defines handlers for requests made to /logins
const loginRouter = require('./controllers/login')
// this file defines any middleware
// currently allows tokens to be called cleanly and
// and handle errors better. also logs any requests made to server
const middleware = require('./utils/middleware')
// same settings as index.js
const config = require('./utils/config')
const logger = require('./utils/logger')
// imports mongoose
const mongoose = require('mongoose')
logger.info('connecting to', config.MONGODB_URI)
// uses mongoose with mongodb(in this case the atlas server)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })
//  allows requests from outside iteself
app.use(cors())

// informs express which format
app.use(express.static('build'))
app.use(express.json()) 

app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app



  
 

  