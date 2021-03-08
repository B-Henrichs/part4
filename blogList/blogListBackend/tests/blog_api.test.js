const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
//const blogslist = require('../utils/blogs_for_test')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    const blogObjects = helper.initialBlogs
      .map( blog => new Blog(blog))

      const promiseArray =blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
      
    })
 
describe('when you querey the initital database',() => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 6 blogs', async () => {
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is about react patterns', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('React patterns')
  })
})

describe('viewing a specific blog', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})


describe('addition of a new blog', () => {
  test('succeeds with valid blog', async () => {
    const newBlog = {
        title: "test blog",
        author: "Blogbert b. Blogtin",
        url: "http://blog.cleanblogger.com/uncle-blog/2016/05/01/blogWars.html",
        likes: 2,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
      'test blog'
    )
  })
  test('fails without title results in error 400', async () => {
    const newBlog = {
        author: "Blogbert b. Blogtin",
        url: "http://blog.cleanblogger.com/uncle-blog/2016/05/01/blogWars.html",
        likes: 2,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
   const blogsAtEnd = await helper.blogsInDb()
   
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  
    test('fails without url results in error 400', async () => {
  
      const newBlog = {
        title: "test blog2",
        author: "Blogbert c. Blogtin",
        url: "",
    likes: '5'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    })
  
    test('fails without author results in error 400', async () => {
  
      const newBlog = {
        title: "test blog2",
        author: "",
        url: "Blogbert c. Blogtin",
    likes: '5'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    })

  test( 'likes are defaulted to zero', async () => {
    const newBlog = {
      title: "test blog2",
      author: "Blogbert c. Blogtin",
      url: "http://blog.dirtyblogger.com/uncle-blog/2016/05/01/blogWars.html",
      likes: ''
    }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    blogToCheck = blogsAtEnd.pop()
    expect(blogToCheck).toHaveProperty('likes')

  
  })
})


 
 
describe('blogs can be changed with put and delete', () =>{
  test('a blog can be updated with put', async ()=> {
    
    
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      title: blogToUpdate.title,
      author: "Blogbert b. Blogtin",
      url: blogToUpdate.url,
      likes: blogToUpdate.likes
    }
    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogToCheck = blogsAtEnd[0]

    expect(blogToCheck.author).toContain('Blogbert b. Blogtin')
    
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[5]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })
})  
  
describe('data is structured properly', () => {
  test ('id is not _id', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(processedBlogToView.id).toBeDefined()
  })
})  
  

 

afterAll(() => {
  mongoose.connection.close()
})