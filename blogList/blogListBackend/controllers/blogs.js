const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')






// handles requests to server 
  // @ /blogs
  // added map method from answers page
  // seemed to function before
// removed map method since it wasnt in these solutions

  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
  })


  // handles delete requests
blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'cannot delete a blog that was created by another user'})
  }

  await blog.remove()
  user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end() 
})


blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body 

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    
      response.json(updatedBlog.toJSON())

})


    
  // info page
  blogsRouter.get('/info', async (request, response) => {
     const date= new Date()
     const blogs = await Blog.find({})
     
      response.send(`<p>BLogs list has ${blogs.length}  blogs in it<p> <br/> <div>${date}(Pacific Standard Time)`)
  
})


 
// handles "post" requests to server
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog (request.body)
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)


  if (!blog.title) {
    return response.status(400).json({ 
      error: 'title missing' 
    })
  }else if (!blog.author) {
    return response.status(400).json({ 
      error: 'author missing' 
    })
  }else if (!blog.url) {
    return response.status(400).json({ 
      error: 'url missing' 
    })
  }

  if (!blog.likes) {
    blog.likes = 0
  }
 
  blog.user = user

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})



 // specific entrys
 blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }

})

module.exports = blogsRouter