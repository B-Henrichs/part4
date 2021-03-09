const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// handles requests to server 
  // @ /blogs
  // added map method from answers page
  // seemed to function before
  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })

  // info page
  blogsRouter.get('/info', async (request, response) => {
     const date= new Date()
     const blogs = await Blog.find({})
     
      response.send(`<p>BLogs list has ${blogs.length}  blogs in it<p> <br/> <div>${date}(Pacific Standard Time)`)
  
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

  

// handles "post" requests to server
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  if (!body.title) {
    return response.status(400).json({ 
      error: 'title missing' 
    })
  }else if (!body.author) {
    return response.status(400).json({ 
      error: 'author missing' 
    })
  }else if (!body.url) {
    return response.status(400).json({ 
      error: 'url missing' 
    })
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
 // const savedAndFormattedBlog = savedBlog.toJSON()
  response.json(savedBlog)
})

// handles delete requests
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end() 
})

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      
        response.json(updatedBlog)
  
  })


module.exports = blogsRouter