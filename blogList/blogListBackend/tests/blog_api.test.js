const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

// close beforeeach

//describe block 1
describe('when you querey the initital database',() => {
 
  // t1
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

//t2
  test('there are 6 blogs', async () => {
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

//t3
  test('the first blog is about react patterns', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('React patterns')
  })

  //t4
  test('id field is properly named', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})


// close D1

// start D2
describe('viewing a specific blog', () => {
 

  //t1
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

  //t2
  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  //t3
  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

//close D2

//start D3

describe('addition of a new blog', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'janedoez',
      name: 'Jane Z. Doe',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  //t1
  test('succeeds with valid blog', async () => {
    
    const newBlog = {
        title: "test blog",
        author: "Blogbert b. Blogtin",
        url: "http://blog.cleanblogger.com/uncle-blog/2016/05/01/blogWars.html",
        likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
      'test blog'
    )
  })

  //t2
  test( 'likes are defaulted to zero', async () => {
    const newBlog = {
      title: "test blog2",
      author: "Blogbert c. Blogtin",
      url: "http://blog.dirtyblogger.com/uncle-blog/2016/05/01/blogWars.html"
    }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set(headers)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const added = blogsAtEnd.find(b => b.url === newBlog.url)

    expect(added.likes).toBe(0)
  })


  //t3
  test('fails without title results in error 400', async () => {
    const newBlog = {
        author: "Blogbert b. Blogtin",
        url: "http://blog.cleanblogger.com/uncle-blog/2016/05/01/blogWars.html"    
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    })

  //t4
    test('fails without url results in error 400', async () => {
  
      const newBlog = {
        title: "test blog2",
        author: "Blogbert c. Blogtin",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
  
    })

  //t5
    test('fails without author results in error 400', async () => {
  
      const newBlog = {
        title: "test blog2",
        url: "Blogbert c. Blogtin"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
    })

//sub describe block
    describe('and it is saved to database', () => {
      let result
      beforeEach(async () => {
        const newBlog = {
          title: 'Great developer experience',
          author: 'Hector Ramos',
          url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience',
          likes: 7
        }
    
        result = await api
          .post('/api/blogs')
          .send(newBlog)
          .set(headers)
      })
    //st1
      test('a blog can be deleted', async () => {
    
        const blogToDelete = result.body
        const blogsAtStart = await helper.blogsInDb()
      
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set(headers)
          .expect(204)
      
        const blogsAtEnd = await helper.blogsInDb()
      
        expect(blogsAtEnd.length).toBe(
          blogsAtStart.length - 1
        )
      
        const titles = blogsAtEnd.map(r => r.title)
      
        expect(titles).not.toContain(blogToDelete.title)
      })
    })
  })







 
 
describe('blogs can be changed with put ', () =>{
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'janedoez',
      name: 'Jane Z. Doe',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('and it looks like this', async ()=> {
    
    
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


  
  
})  
  
describe('data is structured properly', () => {
  
  test ('id is not _id', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(processedBlogToView.id).toBeDefined()
  })
})  


describe('when there is initially one user in db', () => {
  
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'boi',
      name: 'Superuser',
      password: 'salainen',
    }
    await api
    .post('/api/users')
    .send(newUser)

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'to',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(' short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'to',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(' short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
  

 

afterAll(() => {
  mongoose.connection.close()
})