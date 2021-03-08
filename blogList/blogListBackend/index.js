const http = require('http')
//const express = require('express')
const app =  require('./app') 
//const cors = require('cors')
//const mongoose = require('mongoose')

const config = require('./utils/config') 
const logger = require('./utils/logger')

// defines the structure of the data
// being entered into the database
//const blogSchema = new mongoose.Schema({
//  title: String,
//  author: String,
//  url: String,
//  likes: Number
//})

// names the structure in a variable
//const Blog = mongoose.model('Blog', blogSchema)


// declares the location of the database
const mongoUrl = 'mongodb://localhost/bloglist'

// connects to server with mongoose (uses index)
//mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


// allows other origins for loading resources
//app.use(cors())

// declares framework and format
//app.use(express.json())


// handles get  requests to blogs page
//app.get('/api/blogs', (request, response) => {
// Blog
//    .find({})
//    .then(blogs => {
//      response.json(blogs)
//    })
//})


// handles posts to blogs page
//app.post('/api/blogs', (request, response) => {
//  const blog = new Blog(request.body)

//  blog
//    .save()
//    .then(result => {
//      response.status(201).json(result)
//   })
//})

const server = http.createServer(app)

// delclares the port to 3003
const PORT = 3003
// tells its to respond to requests made to that port
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})