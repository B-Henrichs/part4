const Blog = require('../models/blog')
const blogslist = require('../utils/blogs_for_test')
const initialBlogs = blogslist.blogs

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'no id author', url: 'no id url', likes: '5' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  module.exports = {
    initialBlogs, nonExistingId, blogsInDb
  }