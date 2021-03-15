const listHelper = require('../utils/list_helper.js')
const blogList = require('../utils/blogs_for_test.js') //Put blog array in separate file to make this one easier to read

describe('total likes', () => {
  const oneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('of empty array equals 0', () => {
    const result = listHelper.averageLikes([])

    expect(result).toBe(0)
  })

  test('of one value is the value itself', () => {
    const result = listHelper.averageLikes(oneBlog)

    expect(result).toBe(5)
  })

  test('of blog list to be calculated correctly', () => {
    const result = listHelper.totalLikes(blogList.blogs)
    

    expect(result).toBe(36)
  })

})